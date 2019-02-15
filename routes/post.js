var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var request = require('request');
var voucher = require('../modals/voucher').voucher;
var vdetail = require('../modals/vdetail').vdetail;
var ledgermaster = require('../modals/ledgermaster').ledgermaster;
var vbill =require('../modals/vbill').vbill;
var vcc =require('../modals/vcc').vcc;
var vtax =require('../modals/vtax').vtax;
var vitem = require('../modals/vitem').vitem;
var vprofitsharing = require('../modals/vprofitsharing').vprofitsharing;
var component_to_service = require('../modals/component_to_service_category').component_to_service;
var ser1 = require('../services/function1');
var moment = require('moment');
const Op = Sequelize.Op;





router.get("/data",(req,res,next)=>{
    var fromdate= req.query.fromdate || null;
    var todate= req.query.todate || null;
    var comp = req.query.company || null;
    console.log(fromdate,todate,comp)
    if(fromdate != null && todate!=null && comp!=null){
        //and operation
        voucher.findAll({
            where:{
                cid:comp,
                transactionDate:{
                    [Op.between]: [fromdate,todate]
                }
            }
        }).then((result1)=>{
            res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
        }).catch((qerror)=>{
            next(createError(550,qerror));
        })
    }
    else if(fromdate != null && todate!=null && comp==null){
        //only date filter
        voucher.findAll({
            where:{
                transactionDate:{
                    [Op.between]: [fromdate,todate]
                }
            }
        }).then((result1)=>{
            res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
        }).catch((qerror)=>{
            next(createError(550,qerror));
        })
    }
    else if(fromdate == null && todate==null && comp!=null){
        //company filter
        voucher.findAll({
            where:{
                cid:comp
            }
        }).then((result1)=>{
            res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
        }).catch((qerror)=>{
            next(createError(550,qerror));
        })
    }
    else{
        //no filter
        voucher.findAll().then((result1)=>{
            res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
        }).catch((qerror)=>{
            next(createError(550,qerror));
        })
    }   
    
});






router.post('/',(req,res,next)=>{
    var id = req.body.id;
    voucher.findAll({
        attributes: ['transactionDate','transactionNumber','transactionType','transactionDescription',
            'txnCode','voucherAlias','apiRef','docLink','fxRate','isFx','isInv','refFileName','isSEZ',
            'isAbatement','gstin','currencySymbol','realbookID'
        ],
        where:{
            id:id
        }
    }).then((result1)=>{
        let f= result1[0].dataValues;
        f.gstParty={
            ledgerName:"GstParty",
            ledgerGroupName:"creditors",
            partyDetails:null
        };
        ser1.dd(f.transactionDate).then((ff)=>{
            f.transactionDate=ff;
        });
        vdetail.findAll({
            attributes: ['vid','cr','dr','accessibleAmount','bankInstrumentNo','bankInstrumentDate','bankInstrumentType',
                'bankName','date','ledger'
            ],
            where:{
                vid:id
            }
        }).then((result2)=>{
            var ledgerDetails=[];
            result2.forEach((ii,index)=>{
                    var element =ii.dataValues;
                    ser1.dd(element.date).then((d)=>{
                        element.date=d;
                    });
                    var vid = element.vid;
                    var Lid = element.ledger;
                    delete element['ledger'];
                    delete element['vid'];
                    //console.log(element);
                    if(element.cr != 0){
                        element.amountType='cr';
                        element.amount=element.cr;
                        delete element['cr'];
                        delete element['dr'];
                    }
                    else{
                        element.amountType='dr';
                        element.amount=element.dr;
                        delete element['dr'];
                        delete element['cr'];
                    }
                    var p1 = ser1.led1(Lid);
                    var p2 = ser1.vbill1(id,vid);
                    var p3 = ser1.vtax1(id,vid);
                    var p4 = ser1.vcc1(id,vid);
                    Promise.all([p1,p2,p3,p4]).then((values)=>{
                        element.ledger=values[0];
                        element.bill=values[1];
                        element.taxLedger=values[2];
                        element.costCenter=values[3];
                        ledgerDetails.push(element);
                        if(ledgerDetails.length==result2.length){
                            var action;
                            console.log(f.realbookID);
                            if(f.realbookID==null){
                                f.id=0;
                                delete f['realbookID'];
                                action="create";
                            }
                            else{
                                f.id=f.realbookID;
                                delete f['realbookID'];
                                action="update";
                            }
                            f.ledgerDetails=ledgerDetails;
                            console.log(JSON.stringify(f));
                            var pp=ser1.push1(f,action);
                            pp.then((backed)=>{
                                voucher.update({
                                    realbookID:backed.id
                                },{
                                    where:{
                                        id:id
                                    }
                                }).then((self)=>{
                                    console.log(self);
                                    res.send([backed,f]);
                                }).catch((errordb)=>{
                                    res.status(500).send(errordb);
                                })
                            }).catch((errr)=>{
                                res.status(500).send("Error");
                            });
                        }
                    })
                       
            });
            
            
        }).catch((error1)=>{
            next(createError(550,error1));
        })
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
})









//get vdetails
router.post('/getvdetails',(req,res,next)=>{
    var vid= req.body.id;
    vdetail.findAll({
        attributes: ['vid','cr','dr','accessibleAmount','bankInstrumentNo','bankInstrumentDate','bankInstrumentType',
            'bankName','date','ledger','cid'
        ],
        where:{
            vid:vid
        }
    }).then((data)=>{
        dataSend=[];
        data.forEach((ii,index)=>{
            var element =ii.dataValues;
            if(element.cr != null){
                element.amountType='cr';
                element.amount=element.cr;
                delete element['cr'];
                delete element['dr'];
            }
            else{
                element.amountType='dr';
                element.amount=element.dr;
                delete element['dr'];
                delete element['cr'];
            }
            dataSend.push(element);
            if(dataSend.length==data.length){
                res.json(data);
            }
        });
        
    }).catch((err)=>{
        res.status(500).send(err);
    })
    
});








module.exports=router;
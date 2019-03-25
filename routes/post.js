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
var company_master = require("../modals/companymaster").company_master;




router.get("/data",(req,res,next)=>{
    var fromdate= req.query.fromdate || null;
    var todate= req.query.todate || null;
    var comp = req.query.company || null;
    console.log(fromdate,todate,comp);
    company_master.findAll({
        attributes: ['id', 'name'],
        where: {
            is_supplier:1
        }
    }).then((comp_res)=>{
        if(fromdate != null && todate!=null && comp!=null){
            sequelize.query("SELECT voucher.*,voucher.id AS vid,company_master.name,vdetail.cr AS partyCr,vdetail.dr AS partyDr,ledgermaster.ledger_name AS partyName FROM voucher INNER JOIN `company_master` ON voucher.cid=company_master.rlb_cid INNER JOIN `vdetail` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.status=1) INNER JOIN `ledgermaster` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.ledger=ledgermaster.id) WHERE voucher.cid="+comp+" AND (voucher.transactionDate BETWEEN "+fromdate+" AND "+todate+") AND voucher.status=1").then((result1)=>{
                console.log(result1);
                res.render('post_table',{layout:false,data:result1[0],fromdate:fromdate,todate:todate,comp:comp,company:comp_res});
            })
        }
        else if(fromdate != null && todate!=null && comp==null){
            //only date filter
            /*voucher.findAll({
                where:{
                    transactionDate:{
                        [Op.between]: [fromdate,todate]
                    }
                }
            }).then((result1)=>{
                res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
            }).catch((qerror)=>{
                next(createError(550,qerror));
            })*/
            sequelize.query("SELECT voucher.*,voucher.id AS vid,company_master.name,vdetail.cr AS partyCr,vdetail.dr AS partyDr,ledgermaster.ledger_name AS partyName FROM voucher INNER JOIN `company_master` ON voucher.cid=company_master.rlb_cid INNER JOIN `vdetail` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.status=1) INNER JOIN `ledgermaster` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.ledger=ledgermaster.id) WHERE (voucher.transactionDate BETWEEN "+fromdate+" AND "+todate+") AND voucher.status=1").then((result1)=>{
                console.log(result1);
                res.render('post_table',{layout:false,data:result1[0],fromdate:fromdate,todate:todate,comp:comp,company:comp_res});
            })
        }
        else if(fromdate == null && todate==null && comp!=null){
            //company filter
            /*voucher.findAll({
                where:{
                    cid:comp
                }
            }).then((result1)=>{
                res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
            }).catch((qerror)=>{
                next(createError(550,qerror));
            })*/
            sequelize.query("SELECT voucher.*,voucher.id AS vid,company_master.name,vdetail.cr AS partyCr,vdetail.dr AS partyDr,ledgermaster.ledger_name AS partyName FROM voucher INNER JOIN `company_master` ON voucher.cid=company_master.rlb_cid INNER JOIN `vdetail` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.status=1) INNER JOIN `ledgermaster` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.ledger=ledgermaster.id) WHERE voucher.status=1 AND voucher.cid="+comp ).then((result1)=>{
                console.log(result1);
                res.render('post_table',{layout:false,data:result1[0],fromdate:fromdate,todate:todate,comp:comp,company:comp_res});
            })
        }
        else{
            //no filter
            /*voucher.findAll().then((result1)=>{
                res.render('post_table',{layout:false,data:result1,fromdate:fromdate,todate:todate,comp:comp});
            }).catch((qerror)=>{
                next(createError(550,qerror));
            })*/
            sequelize.query("SELECT voucher.*,voucher.id AS vid,company_master.name,vdetail.cr AS partyCr,vdetail.dr AS partyDr,ledgermaster.ledger_name AS partyName FROM voucher INNER JOIN `company_master` ON voucher.cid=company_master.rlb_cid INNER JOIN `vdetail` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.status=1) INNER JOIN `ledgermaster` ON (voucher.id = vdetail.vid AND vdetail.narration='r2@0' AND vdetail.ledger=ledgermaster.id) WHERE voucher.status=1" ).then((result1)=>{
                console.log(result1[0].length);
                res.render('post_table',{layout:false,data:result1[0],fromdate:fromdate,todate:todate,comp:comp,company:comp_res});
            })
        }
    });
       
    
});






router.post('/',(req,res,next)=>{
    var id = req.body.id;
    voucher.findAll({
        attributes: ['transactionDate','transactionNumber','transactionType','transactionDescription',
            'txnCode','voucherAlias','apiRef','docLink','fxRate','isFx','isInv','refFileName','isSEZ',
            'isAbatement','gstin','realbookID','module','cid','segid'
        ],
        where:{
            id:id
        }
    }).then((result1)=>{
        let f= result1[0].dataValues;
        var type_module=f.module;
        var type_cid=f.cid;
        var type_segid=f.segid;	
        delete f['module'];
        delete f['cid'];
        delete f['segid'];
        console.log(type_cid,type_segid);
        if(type_module=='so' || type_module=='po'){
            //inv
            /*
            f.gstParty={
                ledgerName:"GstParty",
                ledgerGroupName:"creditors",
                partyDetails:null
            };
            */
           f.gstParty=null;
            ser1.dd(f.transactionDate).then((ff)=>{
                f.transactionDate=ff;
            });
            vdetail.findAll({
                attributes: ['vid','cr','dr','accessibleAmount','bankInstrumentNo','bankInstrumentDate','bankInstrumentType',
                    'bankName','date','ledger','currency_id',['narration','ledgerType']
                ],
                where:{
                    vid:id,
                    status:1
                }
            }).then((result2)=>{
                var ledgerDetails=[];
                result2.forEach((ii,index)=>{
                        
                        var element =ii.dataValues;
                        var cur =  element.currency_id;
                        delete element['currency_id'];
                        ser1.currency(cur).then((da)=>{
                            console.log(da[0].symbol);
                            f.currencySymbol = da[0].symbol;
                        });
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
                        //var p2 = ser1.vbill1(id,vid);
                        var p3 = ser1.vtax1(id,vid);
                        var p4 = ser1.vcc1(id,vid);
                        Promise.all([p1,p3,p4]).then((values)=>{
                            element.ledger=values[0];
                            //element.bill=values[1];
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
                                //console.log(JSON.stringify(f));
                                var invv={};
                                invv.id=f.id;
                                invv.apiRef=f.apiRef;
                                invv.isFx=f.isFx;
                                invv.fxRate=f.fxRate;
                                invv.currencySymbol= f.currencySymbol
                                invv.transactionNumber=f.transactionNumber;
                                invv.transactionDate=f.transactionDate;
                                invv.transactionType=f.transactionType;
                                invv.transactionDescription=f.transactionDescription;
                                /*change*/f.transactionNumber=id;
                                invv.accountsTransaction=f;
                                /*
                                invv.gatePass= { 
                                    unloadingTime: null, 
                                    locationName: null, 
                                    deliveryNumber: "", 
                                    lorryNumber: null, 
                                    netWeight: 0, 
                                    containerNo: "", 
                                    grossWeight: 0, 
                                    driverMobile: "", 
                                    tareWeight: 0, 
                                    wayBillNo: "", 
                                    driverName: "", 
                                    transporterName: null, 
                                    gatePassDescription: null, 
                                    freightType: null, 
                                    lrNo: ""
                                };*/
                                invv.gatePass=null;
                                invv.purchaseOrderDate=null;
                                invv.purchaseOrderNumber=null;
                                invv.docLink=null;
                                invv.shippingPartyAddress=null;
                                invv.shippingPartyName=null;
                                invv.refFileName=null;
                                invv.txnCode=null;
                                /*changed*/invv.transactionNumber=Number(id);
                                ser1.prepareItem(id).then((dataret)=>{
                                    console.log(dataret)
                                    invv.itemDetails=dataret;
                                    console.log(JSON.stringify(invv));
                                    var pp=ser1.push2(invv,action,type_cid,type_segid);
                                    pp.then((backed)=>{
                                        voucher.update({
                                            realbookID:backed.voucherId
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
                                        res.status(500).send(errr);
                                    });
                                }).catch((errrr)=>{
                                    res.status(500).send("Error");
                                })
                               
                            }
                        })
                           
                });
                
                
            }).catch((error1)=>{
                next(createError(550,error1));
            })
        }
        else if (type_module=='acc'){
            //acc
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
                    'bankName','date','ledger','currency_id'
                ],
                where:{
                    vid:id,
                    status:1
                }
            }).then((result2)=>{
                var ledgerDetails=[];
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiiii");
                result2.forEach((ii,index)=>{
                        var element =ii.dataValues;
                        var cur =  element.currency_id;
                        delete element['currency_id'];
                        
                        ser1.currency(cur).then((da)=>{
                            console.log(da[0].symbol);
                            f.currencySymbol = da[0].symbol;
                        });
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
                                var pp=ser1.push1(f,action,type_cid,type_segid);
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
                                    res.status(500).send(errr);
                                });
                            }
                        })
                           
                });
                
                
            }).catch((error1)=>{
                next(createError(550,error1));
            })
        }
        else{
            f.gstParty=null;
            ser1.dd(f.transactionDate).then((ff)=>{
                f.transactionDate=ff;
            });
            vdetail.findAll({
                attributes: ['vid','cr','dr','accessibleAmount','bankInstrumentNo','bankInstrumentDate','bankInstrumentType',
                    'bankName','date','ledger','currency_id',['narration','ledgerType']
                ],
                where:{
                    vid:id
                }
            }).then((result2)=>{
                var ledgerDetails=[];
                result2.forEach((ii,index)=>{
                        var element =ii.dataValues;
                        var cur =  element.currency_id;
                        delete element['currency_id'];
                        ser1.currency(cur).then((da)=>{
                            console.log(da[0].symbol);
                            f.currencySymbol = da[0].symbol;
                        });
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
                                //console.log(JSON.stringify(f));
                                var invv={};
                                invv.id=f.id;
                                invv.apiRef=f.apiRef;
                                invv.isFx=f.isFx;
                                invv.fxRate=f.fxRate;
                                invv.currencySymbol= f.currencySymbol
                                invv.transactionNumber=f.transactionNumber;
                                invv.transactionDate=f.transactionDate;
                                invv.transactionType=f.transactionType;
                                invv.transactionDescription=f.transactionDescription;
                                invv.accountsTransaction=f;
                                /*
                                invv.gatePass= { 
                                    unloadingTime: null, 
                                    locationName: null, 
                                    deliveryNumber: "", 
                                    lorryNumber: null, 
                                    netWeight: 0, 
                                    containerNo: "", 
                                    grossWeight: 0, 
                                    driverMobile: "", 
                                    tareWeight: 0, 
                                    wayBillNo: "", 
                                    driverName: "", 
                                    transporterName: null, 
                                    gatePassDescription: null, 
                                    freightType: null, 
                                    lrNo: ""
                                };*/
                                invv.gatePass=null;
                                invv.purchaseOrderDate=null;
                                invv.purchaseOrderNumber=null;
                                invv.docLink=null;
                                invv.shippingPartyAddress=null;
                                invv.shippingPartyName=null;
                                invv.refFileName=null;
                                invv.txnCode=null;
                                ser1.prepareItem(id).then((dataret)=>{
                                    console.log(dataret)
                                    invv.itemDetails=dataret;
                                    console.log(JSON.stringify(invv));
                                    var pp=ser1.push2(invv,action,type_cid,type_segid);
                                    pp.then((backed)=>{
                                        voucher.update({
                                            realbookID:backed.voucherId
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
                                        res.status(500).send(errr);
                                    });
                                }).catch((errrr)=>{
                                    res.status(500).send(errrr);
                                })
                               
                            }
                        })
                           
                });
                
                
            }).catch((error1)=>{
                next(createError(550,error1));
            })
        }
        
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
})









//get vdetails
router.post('/getvdetails',(req,res,next)=>{
    var vid= req.body.id;
    var p1 = voucher.findAll({
        attributes: ['transactionDescription'],
        where:{
            id:vid
        }
    });
    var p2 = sequelize.query("SELECT vdetail.*,ledgermaster.id AS ledgerid,ledgermaster.ledger_name FROM vdetail INNER JOIN `ledgermaster` ON vdetail.ledger=ledgermaster.id WHERE vdetail.vid="+vid);
    Promise.all([p1,p2]).then((result1)=>{
        console.log(result1)
        res.json(result1);
    })
    
});








module.exports=router;

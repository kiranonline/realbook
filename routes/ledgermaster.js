var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var modals1 = require('../modals/ledgermaster');
var modals2 = require('../modals/taxmaster');
var modals3 = require('../modals/ledgertaxlink');
const Op = Sequelize.Op;
var suppliermaster = require("../modals/suppliermaster").suppliermaster;
var customermaster = require("../modals/customermaster").customermaster;


//get form
router.get('/form', function(req, res, next) {
    var id = req.query.id || null;
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    var backto = req.query.backto || null;
    var p1 = modals2.taxmaster.findAll({
        attributes: ['name','id']
    });
    Promise.all([p1]).then((values)=>{
        if(id==null){
            res.render('ledgermaster_form',{layout:false,msg:msg,msgText:msgText,tax_group:values[0],backto:backto});
        }
        else{
            var p3 = modals1.ledgermaster.findAll({
                where:{
                  id:id
                }
            });

            Promise.all([p3]).then((result2)=>{
                if(result2[0].length==0){
                    next(createError(550,"Invalid ID"));
                }
                else{
                    res.render('ledgermaster_form',{ 
                        layout:false,
                        tax_group:values[0],
                        msg:msg,msgText:msgText,
                        e_id:id,
                        e_ledger_nature:result2[0][0].ledger_nature,
                        ledger_name:result2[0][0].ledger_name,
                        ledger_code:result2[0][0].ledger_code,
                        e_ledger_group:result2[0][0].ledger_group,
                        sac_code:result2[0][0].sac_code,
                        e_tax_name:result2[0][0].tax_name,
                        e_tax_group:result2[0][0].tax_group,
                        e_customerid:result2[0][0].customer_id,
                        e_supplierid:result2[0][0].supplier_id,
                        rate:result2[0][0].rate,
                        editable:true,
                        isTasxDone:result2[0][0].isTasxDone,
                        ledgertaxlink:{
                            
                        }
                      });
                }
            }).catch((qerror2)=>{
                next(createError(550,qerror2));
            });
        }

    }).catch((qerror1)=>{
        next(createError(550,qerror1));
    });
       
});


router.post('/get/taxname',(req,res,next)=>{
    console.log(req.body.groupid);
     modals2.taxmaster.findAll({
        attributes: ['name','id','pid'],
        where:{
            pid:req.body.groupid
        }
    }).then((d)=>{
        res.send(d);
    }).catch((er)=>{
        res.send(er)
    })
});


router.get('/get/customer',(req,res,next)=>{
    var p1= sequelize.query("SELECT * FROM customermaster");
    Promise.all([p1]).then((results)=>{
        res.send(results[0][1]);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

router.get('/get/vendor',(req,res,next)=>{
    var p1= sequelize.query("SELECT * FROM suppliermaster");
    Promise.all([p1]).then((results)=>{
        res.send(results[0][1]);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})













//post
router.post('/form',(req,res,next)=>{
    var ID = req.body.editID || null;
    var ledger_nature = req.body.ledger_nature;
    var ledger_name = req.body.ledger_name;
    var ledger_code = req.body.ledger_code;
    var ledger_group = req.body.ledger_group;
    var sac_code = req.body.sac_code || null;
    var tax_group = req.body.tax_group || null;
    var tax_name = req.body.tax_name || null;
    var rate = req.body.rate || null;
    var c_v_name = req.body.c_v_name || null;
    console.log(c_v_name);
    var backto =  req.body.backto || null;
    if(ID==null){
        var tempdata=null;
        if(ledger_nature=='party-customer'){
            tempdata = modals1.ledgermaster.build({
                ledger_nature : ledger_nature,
                ledger_name : ledger_name,
                ledger_code : ledger_code,
                ledger_group : ledger_group,
                sac_code : sac_code,
                tax_group : tax_group,
                tax_name : tax_name,
                rate : rate,
                customer_id:c_v_name,
                party_flag:'customer'
            });
        }
        else if(ledger_nature=='party-vendor'){
            tempdata = modals1.ledgermaster.build({
                ledger_nature : ledger_nature,
                ledger_name : ledger_name,
                ledger_code : ledger_code,
                ledger_group : ledger_group,
                sac_code : sac_code,
                tax_group : tax_group,
                tax_name : tax_name,
                rate : rate,
                supplier_id:c_v_name,
                party_flag:'supplier'
            });
        }
        else{
            tempdata = modals1.ledgermaster.build({
                ledger_nature : ledger_nature,
                ledger_name : ledger_name,
                ledger_code : ledger_code,
                ledger_group : ledger_group,
                sac_code : sac_code,
                tax_group : tax_group,
                tax_name : tax_name,
                rate : rate
            });
        }
        tempdata.save().then(()=>{
            if(backto != null){
                res.redirect(backto);
            }
            else{
                res.redirect('/ledgermaster/form?msg=true&msgText=Data saved');
            }
        }).catch((qerror1)=>{
            next(createError(550,qerror1));
        });
    }
    else{
        modals1.ledgermaster.findAll({
            where:{
              id:ID
            }
        }).then((result2)=>{
            if(ledger_nature=='party-customer'){
                result2[0].update({
                    ledger_nature : ledger_nature,
                    ledger_name : ledger_name,
                    ledger_code : ledger_code,
                    ledger_group : ledger_group,
                    sac_code : sac_code,
                    tax_group : tax_group,
                    tax_name : tax_name,
                    rate : rate,
                    customer_id:c_v_name,
                    party_flag:'customer'
                }).then(()=>{
                    res.redirect('/ledgermaster/form?msg=true&msgText=Data updated&id='+ID);
                }).catch((qerror3)=>{
                    next(createError(550,qerror3));
                });
            }
            else if(ledger_nature=='party-vendor'){
                result2[0].update({
                    ledger_nature : ledger_nature,
                    ledger_name : ledger_name,
                    ledger_code : ledger_code,
                    ledger_group : ledger_group,
                    sac_code : sac_code,
                    tax_group : tax_group,
                    tax_name : tax_name,
                    supplier_id:c_v_name,
                    party_flag:'supplier'
                }).then(()=>{
                    res.redirect('/ledgermaster/form?msg=true&msgText=Data updated&id='+ID);
                }).catch((qerror3)=>{
                    next(createError(550,qerror3));
                });
            }
            else{
                result2[0].update({
                    ledger_nature : ledger_nature,
                    ledger_name : ledger_name,
                    ledger_code : ledger_code,
                    ledger_group : ledger_group,
                    sac_code : sac_code,
                    tax_group : tax_group,
                    tax_name : tax_name,
                    rate : rate
                }).then(()=>{
                    res.redirect('/ledgermaster/form?msg=true&msgText=Data updated&id='+ID);
                }).catch((qerror3)=>{
                    next(createError(550,qerror3));
                });
            }
            
        }).catch((qerror2=>{
            next(createError(550,qerror2));
        }));
    }

});



//delete an item
router.get('/form/delete/:id',(req,res,next)=>{
    var id = req.params.id;
    sequelize.query('DELETE FROM ledgermaster WHERE id='+id).then((result1)=>{
      res.redirect('/ledgermaster/data');
    }).catch((qerror)=>{
      next(createError(550,qerror));
    });
});



//get table
router.get('/data',(req,res,next)=>{
    modals1.ledgermaster.findAll().then((result1)=>{
        res.render('ledgermaster_table',{layout:false,data:result1});
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});




//get taxlink
router.get('/taxlink',(req,res,next)=>{
    res.render('ledgermaster_tax_link',{
        editable:false,
        edit_msg:"No ledger ID found"
    });
});


//get taxlink
router.get('/:id/taxlink',(req,res,next)=>{
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    var ledger_id = req.params.id;
    var p1 = modals2.taxmaster.findAll({
        attributes: ['name','id','pid'],
        where:{
            pid:0
        }
    });
    var p2 = modals1.ledgermaster.findAll({
        where:{
          id:ledger_id
        }
    });
    var p3 = modals3.ledgertaxlink.findAll({
        where:{
            ledger_id:ledger_id
        }
    });
    Promise.all([p1,p2,p3]).then((values)=>{
        if(values[1].length==0){
            //if wrong id
            res.render('ledgermaster_tax_link',{
                editable:false,
                edit_msg:"Invalid ID"
            });
        }
        else{
            //res.send(values[1][0].ledger_nature);
            if(values[1][0].ledger_nature=="income" || values[1][0].ledger_nature=="expense"){
                if(values[2].length==0){
                   res.render('ledgermaster_tax_link',{
                        editable:true,
                        ledger_id:ledger_id,
                        tax_group:values[0],
                        msg:msg,
                        msgText:msgText,
                        haslinked:false
                    }); 
                }
                else{
                    res.render('ledgermaster_tax_link',{
                        editable:true,
                        ledger_id:ledger_id,
                        tax_group:values[0],
                        msg:msg,
                        msgText:msgText,
                        haslinked:true
                    });
                }
                    
                
            }
            else{
                res.render('ledgermaster_tax_link',{
                    editable:false,
                    edit_msg:"This operation is not available"
                });
            }
            
            
        }
    }).catch((qerror1)=>{
        next(createError(550,qerror1));
    });
       
});

//route to pull existing data
router.get('/api/edit/:id',(req,res,next)=>{
    var ledger_id = req.params.id;
    console.log(ledger_id);
    var p3 = modals3.ledgertaxlink.findAll({
        where:{
            ledger_id:ledger_id
        }
    });
    Promise.all([p3]).then((values)=>{

        function check(tmpjson){
            return new Promise((resolve,reject)=>{
                var result=[];
                for(i=0;i<tmpjson.length;i++){
                    //if empty result the inser 1st element
                    if(result.length==0){
                        result.push({
                            tax_group: tmpjson[i].tax_group,
                            data:[tmpjson[i]]
                        });
                    }
                    //if not empty
                    else{
                       var flg=0;
                       //chek for existing group
                       for(j=0;j<result.length;j++){
                           if(result[j].tax_group==tmpjson[i].tax_group){
                               flg=1;
                               result[j].data.push(tmpjson[i]);
                               break;
                           }
                       }
                       if(flg==0){
                            result.push({
                                tax_group:tmpjson[i].tax_group,
                                data:[tmpjson[i]]
                           });
                       } 

                    }
                    if(i==tmpjson.length-1){
                        return resolve(result);
                    }
                }
                 
            });
        }

        function doit(){
            tosend=[];
            tax_group_array=[];
            return new Promise(function(resolve,reject){
                values[0].forEach((element)=>{
                    modals1.ledgermaster.findAll({
                        where:{
                            id:element.ledger_id_linked_with
                        }
                    }).then((da)=>{
                        var tmp={
                            rate:da[0].rate,
                            tax_name:da[0].ledger_name,
                            tax_name_id:da[0].id,
                            tax_type:da[0].tax_name,
                            tax_group:da[0].tax_group
                        }
                        tosend.push(tmp);
                        if(values[0].length==tosend.length){
                            return resolve(tosend);
                        }
                    });
                    
                });
            });
        }
        doit().then((tosend1)=>{
            //console.log(tosend1);
            check(tosend1).then((rr)=>{
                res.send(rr);
            });
            //res.send(tosend1);
        });
    }).catch((qerror1)=>{
        next(createError(550,qerror1));
    });
})



//api
router.post('/api/tax-name',(req,res,next)=>{
    var p1 = modals2.taxmaster.findAll({
        attributes: ['name','id','pid'],
        where:{
            pid:req.body.id
        }
    });
    Promise.all([p1]).then((values)=>{
        res.send(values[0]);
    }).catch((qerror1)=>{
        next(createError(404,qerror1));
    });
});


router.get('/api/ledgername',(req,res,next)=>{
    var p1 = modals1.ledgermaster.findAll({
        attributes: ['id','ledger_name'],
        where:{
            tax_name:req.query.key
        }
    });
    Promise.all([p1]).then((values)=>{
        var copy=[];
        /*values[0].forEach(function(item){
            copy.push(item.ledger_name);
          });*/
        res.send(values[0]);
    }).catch((qerror1)=>{
        next(createError(404,qerror1));
    });
});


router.get('/api/rate',(req,res,next)=>{
    var p1 = modals1.ledgermaster.findAll({
        attributes: ['rate'],
        where:{
            id: req.query.id   
        }
    });
    Promise.all([p1]).then((values)=>{
        res.send(values[0]);
    }).catch((qerror1)=>{
        next(createError(404,qerror1));
    });
})

//
router.post('/ledgertaxlink',(req,res,next)=>{
    var data=req.body;
    var ledger_id=req.body.ledger_id;
        console.log("got");
        function doit(){

            return new Promise(function(resolve,reject){
                sequelize.query("DELETE FROM ledgertaxlink WHERE ledger_id="+ledger_id).then(()=>{
                    console.log("deleted"); 
                    var i =0
                    for(var key in req.body){
                        i++;
                        if(key.substring(0,8)=="tax-name"){
                            var tempdata = modals3.ledgertaxlink.build({
                                ledger_id:ledger_id,
                                ledger_id_linked_with:req.body[key]
                            });
                            tempdata.save();
                        }
                        
                        if(Object.keys(req.body).length==i){
                            resolve()
                        }
                    }
                }).catch((qerror9)=>{
                    next(createError(404,qerror9));
                })

                    
                });
            
        }



        doit().then(function(){
            res.redirect("/ledgermaster/"+ledger_id+"/taxlink?msg=true&msgText=Data updated");
        });
        
    
});


module.exports = router;
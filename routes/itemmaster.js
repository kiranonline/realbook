var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var modals1 = require('../modals/itemmaster');
var modals2 = require('../modals/taxmaster');
var modals3 = require('../modals/itemtaxlink');
var modals4 = require("../modals/ledgermaster");
const Op = Sequelize.Op;




//get form
router.get('/form', function(req, res, next) {
    var id = req.query.id || null;
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    if(id==null){
        res.render('itemmaster_form',{layout:false,msg:msg,msgText:msgText});
    }
    else{
        modals1.itemmaster.findAll({
            where:{
              id:id
            }
        }).then((result2)=>{
            if(result2.length==0){
                next(createError(550,"Invalid ID"));
            }
            else{
                res.render('itemmaster_form',{ 
                    layout:false,
                    msg:msg,msgText:msgText,
                    e_id:id,
                    item_code:result2[0].item_code,
                    item_name:result2[0].item_name,
                    hsn_code:result2[0].hsn_code,
                    e_item_group:result2[0].item_group,
                    e_unit_master:result2[0].unit_master,
                    isTasxDone:result2[0].isTasxDone,
                    editable:true
                  });
            }
        }).catch((qerror2)=>{
            next(createError(550,qerror2));
        });
    }   
});





//post
router.post('/form',(req,res,next)=>{
    var ID = req.body.editID || null;
    var item_code = req.body.item_code;
    var item_name = req.body.item_name;
    var hsn_code = req.body.hsn_code;
    var item_group = req.body.item_group;
    var unit_master = req.body.unit_master;
    var backto =  req.body.backto || null;
    if(ID==null){
        var tempdata = modals1.itemmaster.build({
            item_code : item_code,
            item_name : item_name,
            item_group : item_group,
            unit_master : unit_master,
            hsn_code : hsn_code
        });
        tempdata.save().then(()=>{
            if(backto != null){
                res.redirect(backto);
            }
            else{
                res.redirect('/itemmaster/form?msg=true&msgText=Data saved');
            }
            
        }).catch((qerror1)=>{
            next(createError(550,qerror1));
        });
    }
    else{
        modals1.itemmaster.findAll({
            where:{
              id:ID
            }
        }).then((result2)=>{
            result2[0].update({
                item_code : item_code,
                item_name : item_name,
                item_group : item_group,
                unit_master : unit_master,
                hsn_code : hsn_code
            }).then(()=>{
                res.redirect('/itemmaster/form?msg=true&msgText=Data updated');
            }).catch((qerror3)=>{
                next(createError(550,qerror3));
              });
        }).catch((qerror2=>{
            next(createError(550,qerror2));
        }));
    }

});





//delete an item
router.get('/form/delete/:id',(req,res,next)=>{
    var id = req.params.id;
    sequelize.query('DELETE FROM itemmaster WHERE id='+id).then((result1)=>{
      res.redirect('/itemmaster/data');
    }).catch((qerror)=>{
      next(createError(550,qerror));
    });
});
  








//get table
router.get('/data',(req,res,next)=>{
    modals1.itemmaster.findAll().then((result1)=>{
        res.render('itemmaster_table',{layout:false,data:result1});
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});



//get taxlink
router.get('/:id/taxlink',(req,res,next)=>{
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    var item_id = req.params.id;
    console.log(item_id);
    var p1 = modals2.taxmaster.findAll({
        attributes: ['name','id','pid'],
        where:{
            pid:0
        }
    });
    var p2 = modals1.itemmaster.findAll({
        where:{
          id:item_id
        }
    });
    var p3 = modals3.itemtaxlink.findAll({
        where:{
            item_id:item_id
        }
    });
    Promise.all([p1,p2,p3]).then((values)=>{
        if(values[1].length==0){
            //if wrong id
            res.render('itemmaster_tax_link',{
                editable:false,
                edit_msg:"Invalid ID"
            });
        }
        else{
            
                if(values[2].length==0){
                   res.render('itemmaster_tax_link',{
                        editable:true,
                        item_id:item_id,
                        tax_group:values[0],
                        msg:msg,
                        msgText:msgText,
                        haslinked:false
                    }); 
                }
                else{
                    res.render('itemmaster_tax_link',{
                        editable:true,
                        item_id:item_id,
                        tax_group:values[0],
                        msg:msg,
                        msgText:msgText,
                        haslinked:true
                    });
                }
                    
                
            
            
            
        }
    }).catch((qerror1)=>{
        next(createError(550,qerror1));
    });
       
});






//route to pull existing data
router.get('/api/edit/:id',(req,res,next)=>{
    var item_id = req.params.id;
    console.log(item_id);
    var p3 = modals3.itemtaxlink.findAll({
        where:{
            item_id:item_id
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
                    modals4.ledgermaster.findAll({
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
    var p1 = modals4.ledgermaster.findAll({
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
    var p1 = modals4.ledgermaster.findAll({
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
    var item_id=req.body.item_id;
        console.log("got");
        function doit(){

            return new Promise(function(resolve,reject){
                sequelize.query("DELETE FROM itemtaxlink WHERE item_id="+item_id).then(()=>{
                    console.log("deleted"); 
                    var i =0
                    for(var key in req.body){
                        i++;
                        if(key.substring(0,8)=="tax-name"){
                            var tempdata = modals3.itemtaxlink.build({
                                item_id:item_id,
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
            res.redirect("/itemmaster/"+item_id+"/taxlink?msg=true&msgText=Data updated");
        });
        
    
});




module.exports = router;
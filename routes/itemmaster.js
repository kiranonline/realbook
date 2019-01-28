var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var modals = require('../modals/itemmaster');




//get form
router.get('/form', function(req, res, next) {
    var id = req.query.id || null;
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    if(id==null){
        res.render('itemmaster_form',{layout:false,msg:msg,msgText:msgText});
    }
    else{
        modals.itemmaster.findAll({
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
    if(ID==null){
        var tempdata = modals.itemmaster.build({
            item_code : item_code,
            item_name : item_name,
            item_group : item_group,
            unit_master : unit_master,
            hsn_code : hsn_code
        });
        tempdata.save().then(()=>{
            res.redirect('/itemmaster/form?msg=true&msgText=Data saved');
        }).catch((qerror1)=>{
            next(createError(550,qerror1));
        });
    }
    else{
        modals.itemmaster.findAll({
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
    modals.itemmaster.findAll().then((result1)=>{
        res.render('itemmaster_table',{layout:false,data:result1});
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});





module.exports = router;
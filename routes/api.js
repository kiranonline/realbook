var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');





router.get('/currency/getall',(req,res,next)=>{
    sequelize.query(`SELECT symbol FROM currency`).then((data)=>{
        var c = data[0];
        let tosend = [];
        c.forEach(element => {
            tosend.push(element.symbol)
            if(tosend.length==c.length){
                res.json({
                    currency:tosend
                });
            }
        });
        
    }).catch((err2)=>{
        res.status(500);
    })
});




router.get('/supplier/getall',(req,res,next)=>{
    sequelize.query(`SELECT supplier_id,supplier_display_name  FROM suppliermaster`).then((data)=>{
        res.json({
            supplier : data[0]
        });
    }).catch((ero)=>{
        res.status(500);
    })
})



module.exports=router;
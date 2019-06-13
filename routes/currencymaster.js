var express = require('express');
var router = express.Router();
var sequelize = require('../services/conn');
var createError = require('http-errors');


router.get("/",(req,res,next)=>{
    var p2 = sequelize.query('CALL Adansa.ra_currency_master_list("")');
    Promise.all([p2]).then((result1)=>{
        console.log(result1[0][0])
        res.render('currencymaster',{layout:false,data:result1[0]})
    })
})



module.exports=router;

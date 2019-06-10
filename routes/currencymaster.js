var express = require('express');
var router = express.Router();
var sequelize = require('../services/conn');
var createError = require('http-errors');


router.get("/",(req,res,next)=>{
    var p2 = sequelize.query("SELECT vprofitsharing.*,bookingmaster.RA_REFERENCE,sharingmaster.rule,company_master.name AS sellingName,company_master1.name AS supplyingName FROM vprofitsharing INNER JOIN `company_master`ON (vprofitsharing.seller_co_id=company_master.rlb_cid AND company_master.is_supplier=0) INNER JOIN `company_master` as company_master1 ON (vprofitsharing.supplier_co_id=company_master1.rlb_cid AND company_master1.is_supplier=1) INNER JOIN `bookingmaster` ON vprofitsharing.transaction_id=bookingmaster.id INNER JOIN `sharingmaster` ON vprofitsharing.sharing_master_id=sharingmaster.id;");
    Promise.all([p2]).then((result1)=>{
        console.log(result1[0][0])
        res.render('vprofitsharingmaster',{layout:false,data:result1[0][0]})
    })
})



module.exports=router;

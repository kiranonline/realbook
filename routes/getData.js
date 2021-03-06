var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var model1 = require('../modals/getData');
var createError = require('http-errors');
var request = require('request');

router.get('/fetch',(req,res,next)=>{
    var id = req.query.id || 152395;
    var url = "http://beta.redappletravel.com/crons/realbook_cron.php?id="+id;
    request(url,(error,response,body)=>{
        if(error){
            next(createError(500,error));
        }
        else{
            if(response.body=="\n"){
                next(createError(500,"Invalid Id"));
            }else{
                var data_fetched=JSON.parse(response.body).json_master;
                var tempdata = model1.fetcheddata.build({
                    SBU:data_fetched.SBU,
                    CHECK_IN_DATE:  data_fetched.CHECK_IN_DATE,
                    CHECK_OUT_DATE: data_fetched.CHECK_OUT_DATE,
                    EXCHANGE_RATE:  data_fetched.EXCHANGE_RATE,
                    RA_FILE_HANDLER:    data_fetched.RA_FILE_HANDLER,
                    INVOICE_NUMBER: data_fetched.INVOICE_NUMBER,
                    INVOICE_CURRENCY:   data_fetched.INVOICE_CURRENCY,
                    INVOICE_DATE:   data_fetched.INVOICE_DATE,
                    LEAD_PASSENGER: data_fetched.LEAD_PASSENGER,
                    NO_OF_NIGHTS:   data_fetched.NO_OF_NIGHTS,
                    NO_OF_ROOMS:    data_fetched.NO_OF_ROOMS,
                    BOOKING_NOTES:  data_fetched.BOOKING_NOTES,
                    PER_SERVICE_WISE_SUPPLIER:  data_fetched.PER_SERVICE_WISE_SUPPLIER,
                    PAYMENT_DEADLINE:   data_fetched.PAYMENT_DEADLINE,
                    PAYMENT_SLABS:  data_fetched.PAYMENT_SLABS,
                    PRODUCT_NAME:   data_fetched.PRODUCT_NAME,
                    RA_REFERENCE:   data_fetched.RA_REFERENCE,
                    ROOM_CATEGORY:  data_fetched.ROOM_CATEGORY,
                    SERVICE_CATEGORY:   data_fetched.SERVICE_CATEGORY,
                    SERVICE_CITY:   data_fetched.SERVICE_CITY,
                    SERVICE_COUNTRY:    data_fetched.SERVICE_COUNTRY,
                    STAND_ALONE:    data_fetched.STAND_ALONE,
                    TAX_CALCULATION:    data_fetched.TAX_CALCULATION,
                    TOTAL_TAX_CALCULATION:  data_fetched.TOTAL_TAX_CALCULATION,
                    TOTAL_IN_AMOUNTS:   data_fetched.TOTAL_IN_AMOUNTS,
                    FOREIGN_CURRENCY:   data_fetched.FOREIGN_CURRENCY,
                    SUPPLIER_PAYMENT_DEADLINE:  data_fetched.SUPPLIER_PAYMENT_DEADLINE,
                    COMPONENTS_WISE_NET_COST:   data_fetched.COMPONENTS_WISE_NET_COST,
                    COMPONENTS_WISE_MARKUP: data_fetched.COMPONENTS_WISE_MARKUP,
                    COMPONENTS_WISE_SELLING_COST:   data_fetched.COMPONENTS_WISE_SELLING_COST,
                    COMPONENTS_WISE_DISCOUNT_COMISSION: data_fetched.COMPONENTS_WISE_DISCOUNT_COMISSION,
                    OVER_ALL_DISCOUNT:  data_fetched.OVER_ALL_DISCOUNT,
                    OVER_ALL_PROFIT:    data_fetched.OVER_ALL_PROFIT,
                    OVER_ALL_LOSS:  data_fetched.OVER_ALL_LOSS,
                    COMPONENTS_WISE_CURRENCY:   data_fetched.COMPONENTS_WISE_CURRENCY
                });
                tempdata.save().then(()=>{
                    res.send("Data fetched and saved successfully");    
                }).catch((error1)=>{
                    res.send(error1);
                });
            }
            
        }
    });
});



module.exports=router;
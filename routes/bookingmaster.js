var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var model1 = require('../modals/bookingmaster');
var createError = require('http-errors');
var request = require('request');
var fileupload = require('../modals/fileUpload').fileupload;




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
                console.log(data_fetched);
                var tempdata = model1.bookingmaster.build(data_fetched);
                tempdata.save().then(()=>{
                    res.send("Data fetched and saved successfully");    
                }).catch((error1)=>{
                    res.send(error1);
                });
            }
            
        }
    });
});



router.post('/push',(req,res,next)=>{
    var data_fetchedArray = req.body.json_master;
    var c=0;
    var up=[];
    data_fetchedArray.forEach((item,i)=>{
        var data_fetched = item;
        console.log(data_fetched)
        up.push(data_fetched);
        if(data_fetchedArray.length==up.length){
            model1.bookingmaster.bulkCreate(up).then(()=>{
                res.send("Done")
            }).catch((err)=>{
                res.status(500).json({err:true,msg:err})
            });
        }
    })
})






function sortBookings(d){
    return new Promise((resolve,reject)=>{
        var result=[];
        d.forEach(function(ele,i) {
            var dd = ele.dataValues;
            if(result.length==0){
                result.push(dd);
            }
            else{
                var flg=0;
                for(j=0;j<result.length;j++){
                    if(result[j].RA_FILE_HANDLER==dd.RA_FILE_HANDLER){
                        flg=1;
                        break;
                    }
                }
                if(flg==0){
                    result.push(dd);
                }
            }
            if(i==d.length-1){
                return resolve(result);
            }
        });
    });
}




router.get("/",(req,res,next)=>{
    model1.bookingmaster.findAll({
        attributes: ['id','RA_FILE_HANDLER', 'INVOICE_NUMBER','INVOICE_CURRENCY',
            'INVOICE_DATE','TOTAL_IN_AMOUNTS','LEAD_PASSENGER',
            'PAYMENT_DEADLINE','RA_AGENT_CODE','FETCHED_ON','OPERATED_ON','SENT_TO_REALBOOK'
        ]
    }).then((result1)=>{
        console.log(result1.length);
        sortBookings(result1).then((data)=>{
            console.log(data.length);
            res.render('bookingmaster',{layout:false,data:data});
        })
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});






function categorise(d){
    return new Promise(function(resolve,reject){
        var res={};
        var hotel=[];
        var transport=[];
        var other=[];
        d.forEach(function(ele,i){
            var element= ele.dataValues;
            if(element.SERVICE_CATEGORY=='hotel'){
                hotel.push(element);
            }
            else if(element.SERVICE_CATEGORY=='transfer'){
                transport.push(element);
            }
            else{
                other.push(element)
            }
            if(i==hotel.length+transport.length+other.length-1){
                res.hotel=hotel;
                res.transport=transport;
                res.other=other;
                return resolve(res);
            }
        })
    });
}

router.post("/:id",(req,res,next)=>{
    var id = req.params.id;
    model1.bookingmaster.findAll({
        where:{
            RA_FILE_HANDLER:id
        }
    }).then((result1)=>{
        categorise(result1).then((data)=>{
            data.info = result1[0].dataValues;
            res.json(data);
        })
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
    
    
})





/*{
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
                    COMPONENTS_WISE_CURRENCY:   data_fetched.COMPONENTS_WISE_CURRENCY,
                    RA_AGENT_CODE:data_fetched.RA_AGENT_CODE,
                    PER_SERVICE_WISE_SUPPLIER_NAME:data_fetched.PER_SERVICE_WISE_SUPPLIER_NAME
                }
                */


module.exports=router;
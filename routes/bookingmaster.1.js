var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var model1 = require('../modals/bookingmaster');
var createError = require('http-errors');
var request = require('request');
var fileupload = require('../modals/fileUpload').fileupload;
let helpers = require("../services/function2");
var config = require('config');



router.get('/fetch/form',(req,res,next)=>{
    res.render('bookingmaster_fetch_form',{
        layout:false
    })
})

router.post('/fetch',(req,res,next)=>{
    var id = req.query.id || 152395;
    var url = "http://beta.redappletravel.com/crons/realbook_cron.php?id="+id;
    request(url,(error,response,body)=>{
        //console.log(response);
        if(error){
            next(createError(500,error));
        }
        else{
            if(response.body=="\n"){
                next(createError(500,"Invalid Id"));
            }else{
                var data_fetched=JSON.parse(response.body).json_master[0];
                console.log(data_fetched.hasOwnProperty("Booking"));
                if(data_fetched.hasOwnProperty("Booking")){
                    helpers.packagePrepare(data_fetched).then(()=>{
                        res.json({
                            success:true,
                            msg:"data fetched"
                        });
                    }).catch((err)=>{
                        res.status(500).json({
                            success:false,
                            msg:err
                        });
                    }) 
                }
                else{
                    helpers.singleBookingPrepare(data_fetched).then(()=>{
                        res.json({
                            success:true,
                            msg:"data fetched"
                        });
                    }).catch((err)=>{
                        res.status(500).json({
                            success:false,
                            msg:err
                        });
                    }) 
                }                          
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
    });
})










//listing part

router.get("/",(req,res,next)=>{
    sequelize.query(`CALL Adansa.ra_booking_master_diaplay("","summary");`).then((data)=>{
        console.log(data);
        console.log(config.get('localBooking.baseUrl'));
        res.render('bookingmaster',{layout:false,data:data,localUrl:config.get('localBooking.baseUrl')});
    }).catch((err2)=>{
        console.log(`Error procedure: ${err2}`);
        res.send(err2);
    })
    
});





router.post("/:id",(req,res,next)=>{
    var id = req.params.id;
    sequelize.query(`CALL Adansa.ra_booking_master_diaplay("${id}","details");`).then((data)=>{
        console.log(data);
        res.json(data);
    }).catch((err2)=>{
        console.log(`Error procedure: ${err2}`);
        res.send(err2);
    })   
})







//fetch existing details
// bookingmaster/local/{{id}}

router.get('/local/:RA_REFERENCE',(req,res,next)=>{
    var RA_REFERENCE = req.params.RA_REFERENCE;
    var p1 = model1.bookingmaster.findAll({
        where:{
            RA_REFERENCE : RA_REFERENCE
        }
    });

    Promise.all([p1]).then((results)=>{
        var data = results[0];
        var data_const={};
        var data_dynamic=[];
        data.forEach((d,i)=>{
            d=d.dataValues;
            if(i==0){
                data_const.FIRSTNAME=d.FIRSTNAME,
                data_const.INVOICE_CURRENCY=d.INVOICE_CURRENCY,
                data_const.INVOICE_NUMBER=d.INVOICE_NUMBER,
                data_const.EXCHANGE_RATE=d.EXCHANGE_RATE,
                data_const.RA_FILE_HANDLER=d.RA_FILE_HANDLER,
                data_const.INVOICE_DATE=d.INVOICE_DATE,
                data_const.PAYMENT_DEADLINE=d.PAYMENT_DEADLINE,
                data_const.RA_REFERENCE=d. RA_REFERENCE,
                data_const.SERVICE_COUNTRY=d.SERVICE_COUNTRY,
                data_const.STAND_ALONE=d.STAND_ALONE,
                data_const.TAX_CALCULATION=d.TAX_CALCULATION,
                data_const.SBU=d.SBU,
                data_const.TOTAL_TAX_CALCULATION=d.TOTAL_TAX_CALCULATION,
                data_const.TOTAL_IN_AMOUNTS=d.TOTAL_IN_AMOUNTS,
                data_const.RA_AGENT_CODE=d.RA_AGENT_CODE,
                data_const.FOREIGN_CURRENCY=d.FOREIGN_CURRENCY,
                data_const.SELLINGCOST=d.SELLINGCOST,
                data_const.SUPPLIER_PAYMENT_DEADLINE=d.SUPPLIER_PAYMENT_DEADLINE,
                data_const.BOOKING_NOTES=d.BOOKING_NOTES,
                data_const.COMPONENTS_WISE_DISCOUNT_COMISSION=d.COMPONENTS_WISE_DISCOUNT_COMISSION,
                data_const.OVER_ALL_DISCOUNT=d.OVER_ALL_DISCOUNT,
                data_const.OVER_ALL_PROFIT=d.OVER_ALL_PROFIT,
                data_const.OVER_ALL_LOSS=d.OVER_ALL_LOSS,
                data_const.COMPONENTS_WISE_CURRENCY=d.COMPONENTS_WISE_CURRENCY
            }
            delete d['FIRSTNAME'];
            delete d['INVOICE_CURRENCY'];
            delete d['INVOICE_NUMBER'];
            delete d['EXCHANGE_RATE'];
            delete d['RA_FILE_HANDLER'];
            delete d['INVOICE_DATE'];
            delete d['PAYMENT_DEADLINE'];
            delete d['RA_REFERENCE'];
            delete d['SERVICE_COUNTRY'];
            delete d['STAND_ALONE'];
            delete d['TAX_CALCULATION'];
            delete d['SBU'];
            delete d['TOTAL_TAX_CALCULATION'];
            delete d['TOTAL_IN_AMOUNTS'];
            delete d['RA_AGENT_CODE'];
            delete d['FOREIGN_CURRENCY'];
            delete d['SELLINGCOST'];
            delete d['SUPPLIER_PAYMENT_DEADLINE'];
            delete d['BOOKING_NOTES'];
            delete d['COMPONENTS_WISE_DISCOUNT_COMISSION'];
            delete d['OVER_ALL_DISCOUNT'];
            delete d['OVER_ALL_PROFIT'];
            delete d['OVER_ALL_LOSS'];
            delete d['COMPONENTS_WISE_CURRENCY'];
            data_dynamic.push(d);
            if(data_dynamic.length==data.length){
                data_const.dynamic=data_dynamic;
                res.json({
                    success: true,
                    msg: "data sent successfully.",
                    RA_REFERENCE : RA_REFERENCE,
                    data : data_const
                })
            }
        });
        
        
    }).catch((err)=>{
        res.json({
            success : false,
            msg : err
        })
    })
    
});





//edit if exist or create new
//bookingmaster/local/{{id}}

router.post('/local/:RA_REFERENCE',(req,res,next)=>{
    var RA_REFERENCE = req.params.RA_REFERENCE;
    var data = req.body.data;
    data.ismanual=1;
    var dynamic = data.dynamic;
    delete data['dynamic'];
    var tosave=[];
    dynamic.forEach((d,i)=>{
        var m = { ...d, ...data}
        tosave.push(m);
        if(tosave.length==dynamic.length){
            console.log(tosave)
            
            var p1 = model1.bookingmaster.destroy({
                where:{
                    RA_REFERENCE : RA_REFERENCE
                }
            });
            var p2 = model1.bookingmaster.bulkCreate(tosave);
            p1.then(()=>{
                console.log("deleted");
                p2.then(()=>{
                    console.log("created");
                    res.json({
                        success : true,
                        msg : "data saved successfully."
                    })
                }).catch((err)=>{
                    res.json({
                        success : false,
                        msg : err
                    })
                })
            }).catch((err)=>{
                res.json({
                    success : false,
                    msg : err
                })
            })
        }
    })

});









module.exports=router;
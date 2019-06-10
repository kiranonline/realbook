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
    var id = req.query.id;
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


router.get("/error/:id",(req,res,next)=>{
    console.log('Alll')
    var id = req.params.id;
    sequelize.query(`SELECT error_msg FROM error_posting_tmp WHERE ra_reference="${id}"`).then((data)=>{
        console.log(data[0]);
        res.json(data[0]);
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
            RA_REFERENCE : RA_REFERENCE,
            ismanual : 1,
            
        }            
        
    });

    Promise.all([p1]).then((results)=>{
        if(results[0].length!=0){
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
                    data_const.INVOICE_DATE=d.INVOICE_DATE,
                    data_const.PAYMENT_DEADLINE=d.PAYMENT_DEADLINE,
                    data_const.RA_REFERENCE=d. RA_REFERENCE,
                    data_const.STAND_ALONE=d.STAND_ALONE,
                    data_const.SBU=d.SBU,
                    data_const.TOTAL_TAX_CALCULATION=d.TOTAL_TAX_CALCULATION,
                    data_const.TOTAL_IN_AMOUNTS=d.TOTAL_IN_AMOUNTS,
                    data_const.RA_AGENT_CODE=d.RA_AGENT_CODE,
                    data_const.SELLINGCOST=d.SELLINGCOST,
                    data_const.BOOKING_NOTES=d.BOOKING_NOTES,
                    data_const.OVER_ALL_DISCOUNT=d.OVER_ALL_DISCOUNT,
                    data_const.OVER_ALL_PROFIT=d.OVER_ALL_PROFIT,
                    data_const.OVER_ALL_LOSS=d.OVER_ALL_LOSS,
                    data_const.LEAD_PASSENGER=d.LEAD_PASSENGER,
                    data_const.CHECK_IN_DATE=d.CHECK_IN_DATE,
                    data_const.CHECK_OUT_DATE=d.CHECK_OUT_DATE
                }
                delete d['FIRSTNAME'];
                delete d['INVOICE_CURRENCY'];
                delete d['INVOICE_NUMBER'];
                delete d['EXCHANGE_RATE'];
                delete d['INVOICE_DATE'];
                delete d['PAYMENT_DEADLINE'];
                delete d['RA_REFERENCE'];
                delete d['STAND_ALONE'];
                delete d['SBU'];
                delete d['TOTAL_TAX_CALCULATION'];
                delete d['TOTAL_IN_AMOUNTS'];
                delete d['RA_AGENT_CODE'];
                delete d['SELLINGCOST'];
                delete d['BOOKING_NOTES'];
                delete d['OVER_ALL_DISCOUNT'];
                delete d['OVER_ALL_PROFIT'];
                delete d['OVER_ALL_LOSS'];
                delete d['LEAD_PASSENGER'];
                delete d['CHECK_OUT_DATE'];
                delete d['CHECK_IN_DATE'];
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
        }else{
            res.json({
                success:false,
                msg:'This is not a manual bookingmaster form'
            })
        }
        
        
        
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
    data.flag=0;
    data.ismanual=1;
    if(data.id){
        data.id=parseInt(data.id);
        data.id++;
    }
    var dynamic = data.dynamic;
    delete data['dynamic'];
    var tosave=[];
    dynamic.forEach((d,i)=>{
        var m = { ...d, ...data}
        tosave.push(m);
        if(tosave.length==dynamic.length){
            // console.log(tosave)
           
                model1.bookingmaster.update({ flag:-1},{ where:{
                    RA_REFERENCE : RA_REFERENCE
                }}).then(()=>{
                    
                    console.log("deleted");
                    model1.bookingmaster.findAll({
                        limit: 1,
                        where: {
                          //your where conditions, or without them if you need ANY entry
                        },
                        order: [ [ 'id', 'DESC' ]]
                      }).then(rows=>{
                          if(rows.length>0){
                            tosave[0].id=parseInt(rows[0].id)+1;
                              }
                        
                        
                        model1.bookingmaster.bulkCreate(tosave).then(()=>{
                            console.log("created");
                            // `CALL Adansa.ra_voucher_post_rb_v1('${RA_REFERENCE}');`
                            sequelize.query(`CALL Adansa.ra_voucher_post_rb_v1('${RA_REFERENCE}');`).then(()=>{
                                res.json({
                                    success : true,
                                    msg : "data saved successfully."
                                })
                            }).catch((err2)=>{
                                console.log(`Error procedure: ${err2}`);
                                res.json({
                                    success : false,
                                    msg : err2
                                })
                            })
                            
                        }).catch((err)=>{
                            res.json({
                                success : false,
                                msg : err
                            })
                        })
                    })
                    
                
            })
            
        }
    })

});









module.exports=router;
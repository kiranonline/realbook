var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var model1 = require('../modals/bookingmaster');
var createError = require('http-errors');
var request = require('request');
var fileupload = require('../modals/fileUpload').fileupload;
let helpers = require("../services/function2");




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
                var data_fetched=JSON.parse(response.body).json_master;
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
        res.render('bookingmaster',{layout:false,data:data});
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
        var data = results[0]
        res.json({
            success: true,
            msg: "data sent successfully.",
            RA_REFERENCE : RA_REFERENCE,
            data : data
        })
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
    console.log(data);
    var p1 = model1.bookingmaster.destroy({
        where:{
            RA_REFERENCE : RA_REFERENCE
        }
    });
    var p2 = model1.bookingmaster.bulkCreate(data);
    
    Promise.all([p1,p2]).then((results)=>{
        res.json({
            success : true,
            msg : "data saved successfully."
        })
    }).catch((err)=>{
        res.json({
            success : false,
            msg : err
        })
    });

});









module.exports=router;
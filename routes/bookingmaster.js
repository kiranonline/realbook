var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var model1 = require('../modals/bookingmaster');
var createError = require('http-errors');
var request = require('request');
var fileupload = require('../modals/fileUpload').fileupload;


router.get('/fetch/form',(req,res,next)=>{
    res.render('bookingmaster_fetch_form',{
        layout:false
    })
})

router.post('/fetch',(req,res,next)=>{
    var id = req.query.id || 152395;
    var url = "http://beta.redappletravel.com/crons/realbook_cron.php?id="+id;
    request(url,(error,response,body)=>{
        console.log(response);
        if(error){
            next(createError(500,error));
        }
        else{
            if(response.body=="\n"){
                next(createError(500,"Invalid Id"));
            }else{
                try{
                    var data_fetched=JSON.parse(response.body).json_master;
                    console.log(data_fetched);
                    var tempdata = model1.bookingmaster.build(data_fetched);
                    tempdata.save().then(()=>{
                        sequelize.query(`CALL Adansa.ra_voucher_post_rb_v1('${data_fetched.RA_REFERENCE}');`).then(()=>{
                            res.json({
                                success:true,
                                msg:"data fetched"
                            }); 
                        }).catch((err2)=>{
                            console.log(`Error procedure: ${err2}`);
                        })
                           
                    }).catch((error1)=>{
                        res.status(500).json({
                            success:false,
                            msg:error1
                        });
                    });

                }  catch{
                    res.status(500).json({
                        success:false,
                        msg:error
                    });
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





module.exports=router;
var express = require('express');
var router = express.Router();
var customermaster = require('../modals/customermaster').customermaster;
var createError = require('http-errors');



router.get('/data',(req,res,next)=>{
    customermaster.findAll({
        
    }).then((result1)=>{
        console.log(result1.length);
        //res.send(result1);
        res.render('customermaster',{layout:false,data:result1});
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});



router.post('/push',(req,res,next)=>{
    var data_fetchedArray = req.body.json_master;
    var c=0;
    var up=[];
    data_fetchedArray.forEach((item,i)=>{
        var data_fetched = item;
        console.log(data_fetched)
        var tmpdata={
            client_ref_no:data_fetched.Client_Ref_No,
            customer_mobile_no:data_fetched.Customer_Mobile_No,
            customer_address:data_fetched.Customer_Address,
            customer_country:data_fetched.Customer_Country,
            customer_email_id:data_fetched.Customer_Email_Id,
            customer_file_handler:data_fetched.Customer_File_Handler,
            customer_name:data_fetched.Customer_Name,
            customer_state:data_fetched.Customer_State,
            customer_city:data_fetched.Customer_City,
            customer_work_no:data_fetched.Customer_Work_No,
            gst_no_of_customer:data_fetched.GST_No_of_Customer,
            currency:data_fetched.Currency,
            pan_no:data_fetched.PAN_No
        }
        up.push(tmpdata);
        if(data_fetchedArray.length==up.length){
            customermaster.bulkCreate(up).then(()=>{
                res.send("Done")
            }).catch((err)=>{
                res.status(500).json({err:true,msg:err})
            });
        }
    })
    
    
})



module.exports=router;
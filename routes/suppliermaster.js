var express = require('express');
var router = express.Router();
var suppliermaster = require('../modals/suppliermaster').suppliermaster;
var createError = require('http-errors');




router.get('/data',(req,res,next)=>{
    suppliermaster.findAll({
        
    }).then((result1)=>{
        console.log(result1.length);
        //res.send(result1);
        res.render('suppliermaster',{layout:false,data:result1});
    }).catch((qerror)=>{
        next(createError(550,qerror));
    })
});




router.post('/push',(req,res,next)=>{
    var data_fetchedArray = req.body.json_master;
    var c=0;
    data_fetchedArray.forEach((element)=>{
        var data_fetched = element;
        var tempdata = suppliermaster.build({
            country:data_fetched.Country,
            city:data_fetched.City,
            supplier_type:data_fetched.Supplier_Type,
            base_currency:data_fetched.Base_Currency,
            address:data_fetched.Address,
            phone_number:data_fetched.Phone_Number,
            mobile_number:data_fetched.Mobile_Number,
            fax:data_fetched.Fax,
            email:data_fetched.Email,
            supplier_id:data_fetched.Supplier_Id
    
        });
        tempdata.save().then(()=>{
            c=c+1;
            if(data_fetchedArray.length==c){
                res.send("Done");
            }  
        }).catch((error1)=>{
            res.status(500).send(error1);
        });
    });
})





module.exports=router;
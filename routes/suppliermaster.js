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
    var data_fetched = req.body.json_master;
    var tempdata = suppliermaster.build(data_fetched);
    tempdata.save().then(()=>{
        res.send("Data saved");    
    }).catch((error1)=>{
        res.status(500).send(error1);
    });
})





module.exports=router;
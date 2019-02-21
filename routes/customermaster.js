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
    var data_fetched = req.body.json_master;
    var tempdata = customermaster.build(data_fetched);
    tempdata.save().then(()=>{
        res.send("Data saved");    
    }).catch((error1)=>{
        res.status(500).send(error1);
    });
})



module.exports=router;
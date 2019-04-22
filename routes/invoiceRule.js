var express = require('express');
var router = express.Router();


router.get('/form',(req,res,next)=>{
    var id = req.query.id || null;
    var err= req.query.err || false;
    var errText = req.query.errText;  
    var msg = req.query.msg || false;
    var msgText = req.query.msgText;
    if(id){
        res.render('invoiceRule',{
            layout:false
        })
    }
    else{
        res.render('invoiceRule',{
            layout:false
        })
    }
});



router.post('/form',(req,res,next)=>{
    res.send("hello post");
});




router.get('/data',(req,res,next)=>{
    res.send("Hello from post");
})




module.exports = router;
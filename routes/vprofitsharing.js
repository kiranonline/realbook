var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var createError = require('http-errors');
var vprofitsharing =require("../modals/vprofitsharing").vprofitsharing;
var bookingmaster = require('../modals/bookingmaster').bookingmaster;

router.get('/',(req,res,next)=>{
    /*vprofitsharing.findAll({

    }).then((data)=>{
        //res.send(data)
        res.render('vprofitsharingmaster',{layout:false,data:data})
    }).catch((error)=>{
        next(createError(500));
    })*/
    var p2 = sequelize.query("SELECT vprofitsharing.*,bookingmaster.RA_REFERENCE,sharingmaster.rule,sellingcompany.name AS sellingName,supplyingcompany.name AS supplyingName FROM vprofitsharing INNER JOIN `sellingcompany` ON vprofitsharing.seller_co_id=sellingcompany.id INNER JOIN `supplyingcompany` ON vprofitsharing.supplier_co_id=supplyingcompany.id INNER JOIN `bookingmaster` ON vprofitsharing.transaction_id=bookingmaster.id INNER JOIN `sharingmaster` ON vprofitsharing.sharing_master_id=sharingmaster.id");
    Promise.all([p2]).then((result1)=>{
        console.log(result1[0][0])
        res.render('vprofitsharingmaster',{layout:false,data:result1[0][0]})
    })
});


router.get('/edit/:id',(req,res,next)=>{
    var id = req.params.id;
    var msg= req.query.msg || null;
    console.log(msg);
    if(msg){
        vprofitsharing.findById(id).then((data)=>{
            res.render('vprofitsharing_form',{
                layout:false,
                data:data,
                msg:true
            })
        }).catch((error)=>{
            next(createError(500));
        })
    }
    else{
        vprofitsharing.findById(id).then((data)=>{
            res.render('vprofitsharing_form',{
                layout:false,
                data:data
            })
        }).catch((error)=>{
            next(createError(500));
        })
    }
    
});


router.post("/edit",(req,res,next)=>{
    var id = req.body.id;
    var sharetoSeller = Number(req.body.sharetoSeller);
    sharetoSeller=sharetoSeller.toFixed(2);
    vprofitsharing.findById(id).then((data)=>{
        var netProfit = parseFloat(data.posted_seller_profit) + parseFloat(data.posted_supplier_profit);
        netProfit=netProfit.toFixed(2);
        var share_to_supplier= (netProfit-sharetoSeller).toFixed(2);
        if(share_to_supplier>=0){
            vprofitsharing.update({
                manual_supplier_profit:share_to_supplier,
                manual_seller_profit:sharetoSeller,
                posted_supplier_profit:share_to_supplier,
                posted_seller_profit:sharetoSeller,
                isManual:1
            },{
                where:{
                    id:id
                }
            }).then((self)=>{
                res.redirect('/vprofitsharing/edit/'+id+'/?msg=done')
            }).catch((errordb)=>{
                next(createError(500));
            })
        }
        else{
            next(createError(500));
        }
    }).catch((error)=>{
        next(createError(500));
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
    sequelize.query("SELECT vprofitsharing.*,bookingmaster.* FROM vprofitsharing INNER JOIN `bookingmaster` ON vprofitsharing.transaction_id=bookingmaster.id WHERE vprofitsharing.id="+id ).then((result1)=>{
        console.log(result1[0]);
        res.send(result1[0]);
    })

});

module.exports=router;
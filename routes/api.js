var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
const Op = Sequelize.Op;
var suppliermaster = require("../modals/suppliermaster").suppliermaster;
var customermaster = require("../modals/customermaster").customermaster;





router.get('/currency/getall',(req,res,next)=>{
    sequelize.query(`SELECT symbol FROM currency`).then((data)=>{
        var c = data[0];
        let tosend = [];
        c.forEach(element => {
            tosend.push(element.symbol)
            if(tosend.length==c.length){
                res.json({
                    currency:tosend
                });
            }
        });
        
    }).catch((err2)=>{
        res.status(500);
    })
});




router.get('/supplier/getall',(req,res,next)=>{
    sequelize.query(`SELECT supplier_id,supplier_display_name  FROM suppliermaster`).then((data)=>{
        res.json({
            supplier : data[0]
        });
    }).catch((ero)=>{
        res.status(500);
    })
})







router.get('/supplier/search',(req,res,next)=>{
    let q = req.query.search || "";
    suppliermaster.findAll({
        attributes : ['supplier_id','supplier_display_name'],
        where : {
            [Op.or] : [
                {
                    supplier_id : {
                        [Op.like] : `%${q}%`
                    }
                },
                {
                    supplier_display_name : {
                        [Op.like] : `%${q}%`
                    }
                }
            ]
        }
    }).then((data)=>{
        console.log(data);
        res.json({
            supplier : data
        });
    }).catch((err)=>{
        console.log(err)
        res.status(500);
    })
})






router.get('/customer/search',(req,res,next)=>{
    let q = req.query.search || "";
    customermaster.findAll({
        attributes : ['client_ref_no','customer_name'],
        where : {
            [Op.or] : [
                {
                    client_ref_no : {
                        [Op.like] : `%${q}%`
                    }
                },
                {
                    customer_name : {
                        [Op.like] : `%${q}%`
                    }
                }
            ]
        }
    }).then((data)=>{
        console.log(data);
        res.json({
            customer : data
        });
    }).catch((err)=>{
        console.log(err)
        res.status(500);
    })
})





router.get('/service/country/getall',(req,res,next)=>{
    sequelize.query(`SELECT country_alias FROM company_master WHERE is_supplier=1`).then((data)=>{
        var c = data[0].map((d,i)=>{
            return d.country_alias
        })
        res.json({
            suppliercountry : c
        });
    }).catch((ero)=>{
        res.status(500);
    })
})






router.get('/sbu/getall',(req,res,next)=>{
    sequelize.query(`SELECT id,sbu FROM sbu_master`).then((data)=>{
        res.json({
            sbu : data[0]
        });
    }).catch((ero)=>{
        res.status(500);
    })
})


router.get('/service/countrywithid/getall',(req,res,next)=>{
    sequelize.query(`SELECT id,name FROM company_master WHERE is_supplier=1`).then((data)=>{
        res.json({
            suppliercountry : data[0]
        });
    }).catch((ero)=>{
        res.status(500);
    })
})





module.exports=router;
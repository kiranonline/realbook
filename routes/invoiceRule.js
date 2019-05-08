var express = require('express');
var router = express.Router();
var invoicerule = require('../modals/invoicerule').invoicerule;
var path = require('path');
var sequelize = require('../services/conn');


router.get('/form',(req,res,next)=>{
    var id = req.query.id || null;
    if(id){
        invoicerule.findAll({
            attributes:['id','company_id','party_id','sbu_id','invoice_date'],
            where:{
                id:id
            }
        }).then((data)=>{
            if(data.length==0){
                res.status(500).send({
                    success:false,
                    msg : 'Invalid Id'
                });
            }
            else{
                res.send(data);
            }
            
        }).catch((err)=>{
            res.status(500);
        })
    }
    else{
        res.status(500).send({
            success:false,
            msg : 'Invalid Id'
        });
    }
    
});



router.post('/form',(req,res,next)=>{
    var id = req.body.id || null;
    var company_id = req.body.company_id;
    var party_id = req.body.party_id;
    var sbu_id = req.body.sbu_id;
    var invoice_date = req.body.invoice_date;
    if(id){
        invoicerule.update({
            company_id : company_id,
            party_id : party_id,
            sbu_id : sbu_id,
            invoice_date : invoice_date
        },{
            where:{
                id:id
            }
        }).then((self)=>{
            if(self[0]==0){
                res.status(500).send({
                    success:false,
                    msg : 'Invalid Id'
                });
            }
            else{
                res.send({
                    id : id
                })
            }
        }).catch((errordb)=>{
            res.status(500).send({
                success:false,
                msg : 'Unable to save'
            });
        })
    }
    else{
        var temp = invoicerule.build({
            company_id : company_id,
            party_id : party_id,
            sbu_id : sbu_id,
            invoice_date : invoice_date
        });
        temp.save().then((d)=>{
            res.send(d)
        }).catch(err=>{
            res.status(500).send({
                success:false,
                msg : 'Unable to save'
            });
        })

    }
    
})



router.get('/data/form/*',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../public', 'index1.html'));
})




router.get('/data/table',(req,res,next)=>{
    sequelize.query(`SELECT invoicerule.*,company_master.name AS company_name,suppliermaster.supplier_display_name,sbu_master.sbu FROM invoicerule INNER JOIN company_master ON (company_master.id=invoicerule.company_id) INNER JOIN suppliermaster ON (suppliermaster.supplier_id=invoicerule.party_id) INNER JOIN sbu_master ON (sbu_master.id=invoicerule.sbu_id)`).then((data)=>{
        console.log(data)
        res.render('invoicerule_table',{
            layout:false,
            data:data[0]
        })
    }).catch((error)=>{
        res.render('invoicerule_table',{
            layout:false
        })  
    })
    
})




module.exports = router;
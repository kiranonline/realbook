
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var voucher = require('../modals/voucher').voucher;
var vdetail = require('../modals/vdetail').vdetail;
var ledgermaster = require('../modals/ledgermaster').ledgermaster;
var vbill =require('../modals/vbill').vbill;
var vcc =require('../modals/vcc').vcc;
var vtax =require('../modals/vtax').vtax;
var request = require('request');
var moment = require('moment');


function dd(d){
    return new Promise((resolve,reject)=>{
        try{
            var dateParts =d.split("-");
            var jsDate = dateParts[2].substr(0,2)+"-"+dateParts[1]+"-"+dateParts[0];
            resolve(jsDate);
        }
        catch{
            reject();
        }
    });
}

function led1(Lid){
    return new Promise((resolve,reject)=>{
        ledgermaster.findAll({
            attributes: [['ledger_name','ledgerName'],['ledger_group','ledgerGroupName'],['ledger_code','ledgerCode']],
            where:{
                id:Lid
            }
        }).then((result3)=>{  
            resolve(result3[0]);
        }).catch((error1)=>{
            return reject(error1);
        });
    })
}



function vbill1(Vid,VDid){
    return new Promise((resolve,reject)=>{
        vbill.findAll({
            attributes: ['referenceNo','referenceDate','billAmount','creditPeriod','isNewReference'],
            where:{
                vid:Vid,
                vdid:VDid
            }
        }).then((result4)=>{
            if(result4.length!=0){
                var arr=[];
                result4.forEach((iij,index)=>{
                    var element =iij.dataValues;
                    dd(element.referenceDate.toISOString()).then((dd)=>{
                        element.referenceDate=dd;
                        arr.push(element);
                        if(result4.length==arr.length){
                            resolve(arr);
                        }
                    })
                });
            } 
            else{
                return resolve(null);
            }           
        }).catch((error1)=>{
            return reject(error1);
        });
    })
}


function vtax1(Vid,VDid){
    return new Promise((resolve,reject)=>{
        vtax.findAll({
            attributes: ['taxLedgerid','rate','taxAmount','extraData'],
            where:{
                vid:Vid,
                vdid:VDid
            }
        }).then((result5)=>{
            var taxLedger=[];
            if(result5.length!=0){
                result5.forEach((element2,index2)=>{
                        ress=element2.dataValues;
                        console.log(ress);
                        ledgermaster.findAll({
                            where:{
                                id:ress.taxLedgerid
                            }
                        }).then((result6)=>{
                            ress.taxLedgerName=result6[0].ledger_name;
                            delete ress['taxLedgerid'];
                            taxLedger.push(ress);
                            if(result5.length=taxLedger.length){
                                return resolve(taxLedger)
                            }
                        }).catch((eroor2)=>{
                            return reject(eroor2);
                        })
                })
            }
            else{
                return resolve(null);
            }
            
        }).catch((error2)=>{
            return reject(error2);
        })
    })
}



function vcc1(Vid,VDid){
    return new Promise((resolve,reject)=>{
        vcc.findAll({
            attributes: ['costcenterName','costAmount','date','groupName'],
            where:{
                vid:Vid,
                vdid:VDid
            }
        }).then((result7)=>{
            if(result7.length!=0){
                var arr=[];
                result7.forEach((iij,index)=>{
                    var element =iij.dataValues;
                    dd(element.date.toISOString()).then((dd)=>{
                        element.date=dd;
                        arr.push(element);
                        if(result7.length==arr.length){
                            resolve(arr);
                        }
                    })
                });
                return resolve(result7);
            }
            else{
                return resolve(null);
            }
        }).catch((error)=>{
            return reject(error);
        })
    })
}



function push1(data,action){
    return new Promise((resolve,reject)=>{
        //console.log("2");
        var url;
        if(action=='update'){
            url='http://api.realbooks.in/AMSSERVICE/api/accv/v2/vupdate/1349/1349'
        }
        else{
            url = 'http://api.realbooks.in/AMSSERVICE/api/accv/v2/vcreate/1349/1349';
        }
        console.log(url);
        request.post({
            url: url,
            headers: {
                'accountName': 'apichk'
            },            
            json:{
                accessKey : "U76GHF498HNMR345",
                secretKey : "U76GHF498HNMR345",
                emailid :  "noreply@realbooks.in",
                json_obj : data
            }
        },
        (err, res, body)=> {
            if(err){
                return reject(err);
            }
            else{
                return resolve(body);
            }
        });
    });
}


module.exports={ led1,vbill1,vtax1,vcc1,push1,dd }

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
var vitem = require('../modals/vitem').vitem;



function currency(d){
    return new Promise((resolve,reject)=>{
        sequelize.query(`SELECT symbol FROM currency WHERE id=${d};`).then((data)=>{
            return resolve(data[0]);
        }).catch((err)=>{
            return reject(err);
        })
    })
   
}

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
                vdid:VDid,
                status:1
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
                vdid:VDid,
                status:1
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
                vdid:VDid,
                status:1
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



function push1(data,action,cid,segid){
    return new Promise((resolve,reject)=>{
        //console.log("2");
        var url;
        if(action=='update'){
            url='http://api.realbooks.in/AMSSERVICE/api/accv/v2/vupdate/'+cid+'/'+segid;
        }
        else{
            url = 'http://api.realbooks.in/AMSSERVICE/api/accv/v2/vcreate/'+cid+'/'+segid;
        }
        console.log(url);
        request.post({
            url: url,
            headers: {
                'accountName': 'redapple'
            },            
            json:{
                accessKey : "REDAPPLEGHF498HNMR345",
                secretKey : "REDAPPLEGHF498HNMR345",
                emailid :  "senthil@redapple.com",
                json_obj : data
            }
        },
        (err, res, body)=> {
            if(err){
                return reject(err);
            }
            else{
                console.log(body);
                if(body.type=='error'){
                    return reject(body);
                }
                else{
                    return resolve(body);
                }
                
            }
        });
    });
}





function prepareItem(vid){
    return new Promise((resolve,reject)=>{
        var ans=[];
        var p1= sequelize.query("SELECT vitem.amount AS itemAmount ,itemmaster.item_name AS itemName ,unit_master.unit_name AS unitName ,itemmaster.item_code AS itemCode ,vitem.qty AS quantity, vitem.disc_amt AS discountAmount ,ledgermaster.ledger_name AS ledgerName,ledgermaster.ledger_nature AS LedgerNature , vitem.disc_rate AS discountRate ,vitem.godownname AS godownName FROM vitem INNER JOIN `itemmaster` ON vitem.item_id=itemmaster.id INNER JOIN `unit_master` ON vitem.unit_id=unit_master.unit_id INNER JOIN `ledgermaster` on vitem.lid=ledgermaster.id WHERE vitem.status=1 AND  vitem.vid="+vid);
        Promise.all([p1]).then((results)=>{
            var tmpr= results[0][1];
            tmpr.forEach((curvalue,i)=>{
                console.log("sorry");
                var v= {};
                v.itemAmount=curvalue.itemAmount;
                v.itemName=curvalue.itemName;
                v.unitName=curvalue.unitName;
                v.itemCode=curvalue.itemCode;
                v.quantity=curvalue.quantity;
                v.discountAmount=curvalue.discountAmount;
                v.ledgerName=curvalue.ledgerName;
                v.discountRate=curvalue.discountRate;
                v.godownName=curvalue.godownName;
                v.rowId=i+1;
                /*added*/v.rowType = "c";
                let LedgerNature = curvalue.LedgerNature;
                if(LedgerNature=='tax'){
                    v.itemTax=[{
                        taxAmount:24.3,
                        rate:9,
                        taxLedgerName:"CGST-Output @ 9.0%"
                    },{
                        taxAmount:24.3,
                        rate:9,
                        taxLedgerName:"SGST-Output @ 9.0%"
                    }];
                }
                else{
                    v.itemTax = null;
                }
                ans.push(v);
                if(ans.length==tmpr.length){
                    return resolve(ans);
                }
            })
        }).catch((errors)=>{
            return reject(errors);
        })
    })
    
}





function push2(data,action,cid,segid){
    return new Promise((resolve,reject)=>{
        //console.log("2");
        var url;
        if(action=='update'){
            url='http://api.realbooks.in/AMSSERVICE/api/accv/v2/psvupdate/'+cid+'/'+segid
            
            
        }
        else{
            url = 'http://api.realbooks.in/AMSSERVICE/api/accv/v2/psvcreate/'+cid+'/'+segid
        }
        console.log(url);
        request.post({
            url: url,
            headers: {
                'accountName': 'redapple'
            },            
            json:{
                accessKey : "REDAPPLEGHF498HNMR345",
                secretKey : "REDAPPLEGHF498HNMR345",
                emailid :  "senthil@redapple.com",
                json_obj : data
            }
        },
        (err, res, body)=> {
            if(err){
                return reject(err);
            }
            else{
                console.log(body);
                if(body.type=='error'){
                    return reject(body);
                }
                else{
                    return resolve(body);
                }
                
            }
        });
    });
}



function push3(data,action){
    return new Promise((resolve,reject)=>{
        //console.log("2");
        var url;
        if(action=='update'){
            url='http://api.realbooks.in/AMSSERVICE/api/accv/v2/psvupdate/1349/1349';
            
            
        }
        else{
            url = 'http://api.realbooks.in/AMSSERVICE/api/accv/v2/psvcreate/1349/1349';
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
                console.log(err);
                return reject(err);
            }
            else{
                console.log(body);
                if(body.type=='error'){
                    return reject(body);
                }
                else{
                    return resolve(body);
                }
                
            }
        });
    });
}


module.exports={ led1,vbill1,vtax1,vcc1,push1,dd,prepareItem,push2,push3,currency }

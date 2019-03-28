const Sequelize = require('sequelize');
var sequelize = require('./conn');
var model1 = require('../modals/bookingmaster');






let singleBookingPrepare = (booking)=>{
    console.log("1");
    return new Promise((resolve,reject)=>{
        try{
            var data_fetched=JSON.parse(booking.body).json_master;
            console.log(data_fetched);
            var tempdata = model1.bookingmaster.build(data_fetched);
            console.log("I am done");
            tempdata.save().then(()=>{
                console.log("I am done");
                sequelize.query(`CALL Adansa.ra_voucher_post_rb_v1('${data_fetched.RA_REFERENCE}');`).then(()=>{
                    return resolve();
                }).catch((err2)=>{
                    console.log(`Error procedure: ${err2}`);
                })
                   
            }).catch((error1)=>{
                console.log(error1)
                return reject(error1);
            });
    
        } 
        catch(error){
            console.log(error)
            return reject(error);
        }
    })
}





let packagePrepare = (package)=>{
    
}



module.exports ={ singleBookingPrepare,packagePrepare }
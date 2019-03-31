const Sequelize = require('sequelize');
var sequelize = require('./conn');
var model1 = require('../modals/bookingmaster');






let singleBookingPrepare = (booking)=>{
    console.log("1");
    return new Promise((resolve,reject)=>{
        try{
            let data_fetched = booking;
            console.log(data_fetched);
            var tempdata = model1.bookingmaster.build(data_fetched[0]);
            console.log("I am done");
            tempdata.save().then(()=>{
                console.log("I am done");
                sequelize.query(`CALL Adansa.ra_voucher_post_rb_v1('${data_fetched.RA_REFERENCE}');`).then(()=>{
                    return resolve();
                }).catch((err2)=>{
                    console.log(`Error procedure: ${err2}`);
                    return resolve();
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
    return new Promise((resolve,reject)=>{
        try{
            var data_fetched=package.Booking;
            let hotel = data_fetched.Hotel;
            let tour = data_fetched.Tour;
            delete data_fetched['Hotel'];
            delete data_fetched['Tour'];
            let data = hotel.concat(tour);
            let final_data = data.map((m)=>{
                    m = { ...m, ...data_fetched}
                    return m
            });
            var toPush = [];
            final_data.forEach((element,i) => {
                if(element.ServiceCategory=='Tour'){
                    element.TourTransferComponentsWiseSellingCost = element.TourTransfer.ComponentsWiseSellingCost;
                    element.TourTransferComponentsWiseNetCost = element.TourTransfer.ComponentsWiseNetCost;
                    delete element['TourTransfer'];
                }
                renameKeys(keyMap, element,function(r){
                    toPush.push(r);
                });
                if(toPush.length==final_data.length){
                    console.log(toPush);
                    model1.bookingmaster.bulkCreate(toPush).then(()=>{
                        sequelize.query(`CALL Adansa.ra_voucher_post_rb_v1('${data_fetched.RAReference}');`).then(()=>{
                            return resolve();
                        }).catch((err2)=>{
                            console.log(`Error procedure: ${err2}`);
                            return resolve();
                        })
                    }).catch((err)=>{
                        console.log(err);
                        return reject(err);
                    });
                }
            });

        } 
        catch(error){
            console.log(error)
            return reject(error);
        }
    })
    
}










keyMap = {
    FirstName : 'FIRSTNAME',
    InvoiceCurrency : 'INVOICE_CURRENCY',
    InvoiceNumber : 'INVOICE_NUMBER',
    ExchangeRate : 'EXCHANGE_RATE',
    RaFileHandler : 'RA_FILE_HANDLER',
    InvoiceDate : 'INVOICE_DATE',
    PaymentDeadline : 'PAYMENT_DEADLINE',
    RAReference : 'RA_REFERENCE',
    ServiceCountry : 'SERVICE_COUNTRY',
    StandAlone : 'STAND_ALONE',
    TaxCalculation : 'TAX_CALCULATION',
    TotalTaxCalculation : 'TOTAL_TAX_CALCULATION',
    TotalInAmounts : 'TOTAL_IN_AMOUNTS',
    RAAgentCode : 'RA_AGENT_CODE',
    ForeignCurrency : 'FOREIGN_CURRENCY',
    SellingCost : 'SELLINGCOST',
    SupplierPaymentDeadline : 'SUPPLIER_PAYMENT_DEADLINE',
    BookingNotes : 'BOOKING_NOTES',
    ComponentsWiseDiscountComission : 'COMPONENTS_WISE_DISCOUNT_COMISSION',
    OverAllDiscount : 'OVER_ALL_DISCOUNT',
    OverAllProfit : 'OVER_ALL_PROFIT',
    OverAllLoss : 'OVER_ALL_LOSS',
    ComponentsWiseCurrency : 'COMPONENTS_WISE_CURRENCY',
    ServiceCategory : 'SERVICE_CATEGORY',
    PerServiceSupplierCode : 'PER_SERVICE_SUPPLIER_CODE',
    PerServiceWiseSupplierName : 'PER_SERVICE_WISE_SUPPLIER_NAME',
    ComponentsWiseSellingCost : 'COMPONENTS_WISE_SELLING_COST',
    ComponentsWiseSellingCostCurrency : 'COMPONENT_WISE_SELLING_COST_CURRENCY',
    ComponentsWiseMarkup : 'COMPONENTS_WISE_MARKUP',
    ComponentsWiseNetCost : 'COMPONENTS_WISE_NET_COST',
    ComponentsWiseNetCostCurrency : 'COMPONENTS_WISE_NET_COST_CURRENCY',
    CheckInDate : 'CHECK_IN_DATE',
    CheckOutDate : 'CHECK_OUT_DATE',
    NoOfNights : 'NO_OF_NIGHTS',
    NoOfRooms : 'NO_OF_ROOMS',
    RoomType : 'ROOM_CATEGORY',
    ProductName :'PRODUCT_NAME',
    
    ArrivalDate : 'ARRIVALDATE',
    City : 'CITY',
    TourTransferComponentsWiseSellingCost : 'TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST',
    TourTransferComponentsWiseNetCost : 'TOUR_TRANSFER_COMPONENTS_WISE_NET_COST'

}

renameKeys = (keysMap, obj,callback) =>{
    let r = Object
    .keys(obj)
    .reduce((acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
    }), {});
    callback(r);
} 
























module.exports ={ singleBookingPrepare,packagePrepare }
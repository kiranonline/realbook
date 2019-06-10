const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const bookingmaster = sequelize.define('bookingmaster',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    SBU:{
        allowNull: true,
        type:Sequelize.STRING,
    },
    CHECK_IN_DATE:{
        type:Sequelize.DATEONLY,
        allowNull:true
    },  
    CHECK_OUT_DATE:{
        type:Sequelize.DATEONLY,
        allowNull:true
    },
    EXCHANGE_RATE:{
        type:Sequelize.STRING,
        allowNull:true
    },
    RA_FILE_HANDLER:{
        allowNull: true,
        type:Sequelize.STRING
    },
    PER_SERVICE_WISE_SUPPLIER_NAME:{
        allowNull:true,
        type:Sequelize.STRING
    },
    RA_AGENT_CODE:{
        allowNull:true,
        type:Sequelize.STRING
    },
    INVOICE_NUMBER:{
        allowNull:true,
        type:Sequelize.STRING
    },
    INVOICE_CURRENCY:{
        allowNull:true,
        type:Sequelize.STRING
    },
    INVOICE_DATE:{
        allowNull:true,
        type:Sequelize.DATEONLY
    },
    LEAD_PASSENGER:{
        allowNull: true,
        type:Sequelize.STRING
    },
    NO_OF_NIGHTS:{
        allowNull: true,
        type:Sequelize.STRING
    },
    NO_OF_ROOMS:{
        allowNull: true,
        type:Sequelize.STRING
    },
    BOOKING_NOTES:{
        allowNull: true,
        type:Sequelize.STRING,
    },
    PAYMENT_DEADLINE:{
        allowNull: true,
        type:Sequelize.DATEONLY
    },
    PAYMENT_SLABS:{
        allowNull: true,
        type:Sequelize.STRING
    },
    PRODUCT_NAME:{
        allowNull: true,
        type:Sequelize.STRING
    },
    RA_REFERENCE:{
        allowNull: true,
        type:Sequelize.STRING
    },
    ROOM_CATEGORY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    SERVICE_CATEGORY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    SERVICE_CITY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    SERVICE_COUNTRY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    STAND_ALONE:{
        allowNull: true,
        type:Sequelize.STRING
    },
    TAX_CALCULATION:{
        allowNull: true,
        type:Sequelize.STRING
    },
    TOTAL_TAX_CALCULATION:{
        allowNull: true,
        type:Sequelize.STRING
    },
    TOTAL_IN_AMOUNTS:{
        allowNull: true,
        type:Sequelize.STRING
    },
    FOREIGN_CURRENCY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    SUPPLIER_PAYMENT_DEADLINE:{
        allowNull: true,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_NET_COST:{
        allowNull: true,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_MARKUP:{
        allowNull: true,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_SELLING_COST:{
        allowNull: true,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_DISCOUNT_COMISSION:{
        allowNull: true,
        type:Sequelize.STRING
    },
    OVER_ALL_DISCOUNT:{
        allowNull: true,
        type:Sequelize.STRING
    },
    OVER_ALL_PROFIT:{
        allowNull: true,
        type:Sequelize.DOUBLE(10,2)
    },
    OVER_ALL_LOSS:{
        allowNull: true,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_CURRENCY:{
        allowNull: true,
        type:Sequelize.STRING
    },
    PER_SERVICE_SUPPLIER_CODE:{
        allowNull: true,
        type:Sequelize.STRING
    },
    FETCHED_ON:{
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    OPERATED_ON:{
        allowNull: true,
        type: Sequelize.DATEONLY
    },
    SENT_TO_REALBOOK:{
        allowNull: true,
        type: Sequelize.DATEONLY
    },
    flag:{
        allowNull:false,
        type:Sequelize.INTEGER,
        defaultValue: 0
    },version:{
        allowNull:false,
        type:Sequelize.INTEGER,
        defaultValue: 0
    },



    FIRSTNAME:{
        allowNull: true,
        type:Sequelize.STRING 
    },
    SELLINGCOST:{
        allowNull: true,
        type:Sequelize.STRING 
    },
    COMPONENT_WISE_SELLING_COST_CURRENCY:{
        allowNull: true,
        type:Sequelize.STRING 
    },
    COMPONENTS_WISE_NET_COST_CURRENCY:{
        allowNull: true,
        type:Sequelize.STRING 
    },
    ARRIVALDATE :{
        allowNull: true,
        type:Sequelize.STRING 
    },
    CITY :{
        allowNull: true,
        type:Sequelize.STRING
    },
    TOUR_TRANSFER_COMPONENTS_WISE_SELLING_COST:{
        allowNull: true,
        type:Sequelize.STRING
    },
    TOUR_TRANSFER_COMPONENTS_WISE_NET_COST:{
        allowNull: true,
        type:Sequelize.STRING
    },



    ismanual : {
        type:Sequelize.INTEGER(1),
        allowNull : false,
        defaultValue : 0
    }
    
},{
    timestamps: true,
    createdAt: 'FETCHED_ON',
    updatedAt: false,
    freezeTableName: true,
    tableName: 'bookingmaster'
});



module.exports={ bookingmaster }
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
        allowNull:false
    },  
    CHECK_OUT_DATE:{
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    EXCHANGE_RATE:{
        type:Sequelize.STRING,
        allowNull:false
    },
    RA_FILE_HANDLER:{
        allowNull: false,
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
        allowNull:false,
        type:Sequelize.DATE
    },
    LEAD_PASSENGER:{
        allowNull: false,
        type:Sequelize.STRING
    },
    NO_OF_NIGHTS:{
        allowNull: false,
        type:Sequelize.STRING
    },
    NO_OF_ROOMS:{
        allowNull: false,
        type:Sequelize.STRING
    },
    BOOKING_NOTES:{
        allowNull: false,
        type:Sequelize.STRING,
    },
    PAYMENT_DEADLINE:{
        allowNull: false,
        type:Sequelize.DATE
    },
    PAYMENT_SLABS:{
        allowNull: false,
        type:Sequelize.STRING
    },
    PRODUCT_NAME:{
        allowNull: false,
        type:Sequelize.STRING
    },
    RA_REFERENCE:{
        allowNull: false,
        type:Sequelize.STRING
    },
    ROOM_CATEGORY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    SERVICE_CATEGORY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    SERVICE_CITY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    SERVICE_COUNTRY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    STAND_ALONE:{
        allowNull: false,
        type:Sequelize.STRING
    },
    TAX_CALCULATION:{
        allowNull: false,
        type:Sequelize.STRING
    },
    TOTAL_TAX_CALCULATION:{
        allowNull: false,
        type:Sequelize.STRING
    },
    TOTAL_IN_AMOUNTS:{
        allowNull: false,
        type:Sequelize.STRING
    },
    FOREIGN_CURRENCY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    SUPPLIER_PAYMENT_DEADLINE:{
        allowNull: false,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_NET_COST:{
        allowNull: false,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_MARKUP:{
        allowNull: false,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_SELLING_COST:{
        allowNull: false,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_DISCOUNT_COMISSION:{
        allowNull: false,
        type:Sequelize.STRING
    },
    OVER_ALL_DISCOUNT:{
        allowNull: false,
        type:Sequelize.STRING
    },
    OVER_ALL_PROFIT:{
        allowNull: false,
        type:Sequelize.DOUBLE
    },
    OVER_ALL_LOSS:{
        allowNull: false,
        type:Sequelize.STRING
    },
    COMPONENTS_WISE_CURRENCY:{
        allowNull: false,
        type:Sequelize.STRING
    },
    FETCHED_ON:{
        allowNull: false,
        type: Sequelize.DATE
    },
    OPERATED_ON:{
        allowNull: true,
        type: Sequelize.DATE
    },
    SENT_TO_REALBOOK:{
        allowNull: true,
        type: Sequelize.DATE
    }
},{
    timestamps: true,
    createdAt: 'FETCHED_ON',
    updatedAt: false,
    freezeTableName: true,
    tableName: 'bookingmaster'
});



module.exports={ bookingmaster }
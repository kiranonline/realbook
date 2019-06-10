const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var currency_master = require('./currencymaster');
var company_master = require('./companymaster');
var ledger_master = require('./ledgermaster');

//component
//sellingcompany modal
const voucher = sequelize.define('voucher', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    transactionDate: {
        type:Sequelize.DATE,

    },
    transactionNumber:{
        type: Sequelize.STRING
    },
    transactionType:{
        type: Sequelize.STRING
    },
    transactionDescription:{
        type: Sequelize.STRING
    },
    txnCode:{
        type: Sequelize.STRING
    },
    voucherAlias:{
        type: Sequelize.STRING
    },
    apiRef:{
        type: Sequelize.STRING
    },
    docLink:{
        type: Sequelize.STRING
    },
    fxRate:{
        type: Sequelize.FLOAT
    },
    isFx:{
        type: Sequelize.INTEGER
    },
    isInv:{
        type: Sequelize.INTEGER
    },
    refFileName:{
        type: Sequelize.STRING
    },
    isSEZ:{
        type: Sequelize.INTEGER
    },
    isAbatement:{
        type: Sequelize.INTEGER
    },
    status:{
        type: Sequelize.INTEGER
    },
    currencySymbol:{
        type:Sequelize.STRING
    },
    gstin:{
        type:Sequelize.INTEGER
    },
    gstParty:{
        type:Sequelize.INTEGER
    },
    cid:{
        type:Sequelize.INTEGER
    },
    segid:{
        type:Sequelize.INTEGER
    },
    realbookID:{
        allowNull: true,
        type:Sequelize.INTEGER
    },
    v_nature:{
        type:Sequelize.STRING
    },
    module:{
        type:Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'voucher'
});

voucher.associate = function(models){
    voucher.hasMany(models.vdetail,{foreignKey: 'vid'});
    voucher.hasMany(models.vbill,{foreignKey: 'vid'});
    voucher.hasMany(models.vcc,{foreignKey: 'vid'});
    voucher.hasMany(models.vtax,{foreignKey: 'vid'});
}




module.exports={ voucher }
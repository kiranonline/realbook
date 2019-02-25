const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var voucher = require('./voucher');
var ledger_master = require('./ledgermaster');
var company_master = require('./companymaster');

//component
//sellingcompany modal
const vdetail = sequelize.define('vdetail', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    dr:{
        type:Sequelize.DECIMAL(10, 2)                 
    },
    cr:{
        type:Sequelize.DECIMAL(10, 2)
    },
    date:{
        type: Sequelize.DATE
    },
    accessibleAmount:{
        type:Sequelize.DECIMAL(10, 2)
    },
    bankInstrumentNo:{
        type: Sequelize.STRING
    },bankInstrumentDate:{
        type: Sequelize.DATE
    },
    bankInstrumentType:{
        type:Sequelize.STRING
    },
    bankName:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.INTEGER
    },
    vid:{
        type:Sequelize.INTEGER
    },
    ledger:{
        type:Sequelize.INTEGER
    },
    cid:{
        type:Sequelize.INTEGER
    },
    segid:{
        type:Sequelize.INTEGER
    },
    narration:{
        type:Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'vdetail'
});


vdetail.associate = function(models){
    vdetail.hasMany(models.vcc,{foreignKey: 'vdid'});
    vdetail.hasMany(models.vbill,{foreignKey: 'vdid'});
    vdetail.hasMany(models.vtax,{foreignKey: 'vdid'});
}


module.exports={ vdetail }
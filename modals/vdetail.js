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
        type:Sequelize.DECIMAL                     
    },
    cr:{
        type:Sequelize.DECIMAL
    },
    date:{
        type: Sequelize.DATE
    },
    accessibleAmount:{
        type:Sequelize.DECIMAL
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'vdetail'
});


/*
vdetail.associate = ()=>{
    vdetail.belongsTo(voucher, {foreignKey: 'vid'});
    vdetail.belongsTo(ledger_master, {foreignKey: 'ledger'});
    vdetail.belongsTo(company_master, {foreignKey: 'cid'});
    vdetail.belongsTo(company_master, {foreignKey: 'segid'});
}
*/


module.exports={ vdetail }
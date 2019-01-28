const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var voucher = require('./voucher');
var vdetail = require('./vdetail');
var ledger_master = require('./ledgermaster');


//component
//sellingcompany modal
const vtax = sequelize.define('vtax', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    rate:{
        type:Sequelize.DECIMAL 
    },
    taxAmount:{
        type:Sequelize.DECIMAL
    },
    extraDat:{
        type:Sequelize.DATE
    },
    status:{
        type:Sequelize.INTEGER
    },
    vid:{
        type:Sequelize.INTEGER
    },
    vdid:{
        type:Sequelize.INTEGER
    },
    taxLedgerid:{
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
    tableName: 'vtax'
});



/*
vtax.associate = ()=>{
    vtax.belongsTo(voucher, {foreignKey: 'vid'});
    vtax.belongsTo(vdetail, {foreignKey: 'vdid'});
    vtax.belongsTo(ledger_master, {foreignKey: 'taxLedgerid'});
    vtax.belongsTo(company_master, {foreignKey: 'cid'});
    vtax.belongsTo(company_master, {foreignKey: 'segid'});
}
*/



module.exports={ vtax }
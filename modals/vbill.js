const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var voucher = require('./voucher');
var vdetail = require('./vdetail');
var company_master = require('./companymaster');

//component
//sellingcompany modal
const vbill = sequelize.define('vbill', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    referenceNo:{
        type: Sequelize.STRING  
    },
    referenceDate:{
        type:Sequelize.DATE
    },
    billAmount:{
        type:Sequelize.DECIMAL
    },
    creditPeriod:{
        type:Sequelize.INTEGER,
    },
    isNewReference:{
        type:Sequelize.INTEGER,
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
    tableName: 'vbill'
});





module.exports={ vbill }
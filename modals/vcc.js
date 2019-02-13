const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
var voucher = require('./voucher');
var vdetail = require('./vdetail');
var company_master = require('./companymaster');

//component
//sellingcompany modal
const vcc = sequelize.define('vcc', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    costcenterName:{
        type: Sequelize.STRING  
    },
    costAmount:{
        type:Sequelize.DECIMAL
    },
    date:{
        type:Sequelize.DATE
    },
    groupName:{
        type: Sequelize.STRING 
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
    tableName: 'vcc'
});


module.exports={ vcc }
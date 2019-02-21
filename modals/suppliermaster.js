const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const suppliermaster = sequelize.define('suppliermaster',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    base_currency:{
        type:Sequelize.STRING,
        allowNull:true
    },
    beneficiary_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    country:{
        type:Sequelize.STRING,
        allowNull:true
    },
    city:{
        type:Sequelize.STRING,
        allowNull:true
    },
    payable_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    supplier_type:{
        type:Sequelize.STRING,
        allowNull:true
    },
    supplier_id:{
        type:Sequelize.STRING,
        allowNull:true
    },
    supplier_display_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    address:{
        type:Sequelize.STRING,
        allowNull:true
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:true
    },
    mobile_number:{
        type:Sequelize.STRING,
        allowNull:true
    },
    fax:{
        type:Sequelize.STRING,
        allowNull:true
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true
    },
    time_zone:{
        type:Sequelize.STRING,
        allowNull:true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'suppliermaster'
});


module.exports={ suppliermaster }


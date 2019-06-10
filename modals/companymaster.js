const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
//component
//sellingcompany modal
const company_master = sequelize.define('company_master', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    },
    rlb_cid:{
        type:Sequelize.INTEGER,
    },
    currency:{
        type: Sequelize.STRING(45),
        allowNull:true
    },
    is_supplier:{
        type:Sequelize.INTEGER,
        defaultValue:1
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'company_master'
});


module.exports={ company_master }
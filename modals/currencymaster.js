const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
//component
//sellingcompany modal
const currency = sequelize.define('currency', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    },
    symbol:{
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'currency'
});





module.exports={ currency }
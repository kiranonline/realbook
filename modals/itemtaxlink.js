const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const itemtaxlink = sequelize.define('itemtaxlink', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    item_id:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    ledger_id_linked_with:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'itemtaxlink'
});





module.exports={ itemtaxlink }
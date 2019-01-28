const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const ledgertaxlink = sequelize.define('ledgertaxlink', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ledger_id:{
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
    tableName: 'ledgertaxlink'
});





module.exports={ ledgertaxlink }
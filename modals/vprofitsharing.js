const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


//component
//sellingcompany modal
const vprofitsharing = sequelize.define('vprofitsharing', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    transaction_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    vid:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    sharing_master_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    supplier_co_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    seller_co_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    supplier_co_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    seller_co_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    isManual:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    manual_supplier_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    manual_seller_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    posted_supplier_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    posted_seller_profit:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'vprofitsharing'
});



module.exports={ vprofitsharing }
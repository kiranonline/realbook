const Sequelize = require('sequelize');
var sequelize = require('../services/conn');

//component
//sellingcompany modal
const itemmaster = sequelize.define('itemmaster', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    rlb_item_id:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    item_code:{
        type:Sequelize.STRING,
        allowNull: false
    },
    item_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    item_group:{
        type:Sequelize.STRING,
        allowNull: false
    },
    unit_master:{
        type:Sequelize.STRING,
        allowNull: false
    },
    unit_name:{
        type:Sequelize.STRING,
        allowNull: true
    },
    hsn_code:{
        type:Sequelize.STRING,
        allowNull: false
    },
    status:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    cid:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    segid:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    isTasxDone:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'itemmaster'
});


module.exports={ itemmaster }
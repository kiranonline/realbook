const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const taxmaster = sequelize.define('taxmaster', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING(100),
        allowNull: true
    },
    nature:{
        type:Sequelize.STRING,
        allowNull: true
    },
    category:{
        type:Sequelize.STRING,
        allowNull: true
    },
    country:{
        type:Sequelize.STRING(100),
        allowNull: true
    },
    state:{
        type:Sequelize.STRING(20),
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
    status:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    dt_create:{
        type:Sequelize.DATE,
        allowNull: true
    },
    dt_update:{
        type:Sequelize.DATE,
        allowNull: true
    },
    uid_create:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    uid_update:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    isSystem:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1
    },
    applied_on:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    tax_system:{
        type:Sequelize.STRING(20),
        allowNull: true,
        defaultValue:'1'
    },
    pid:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'taxmaster'
});


module.exports={ taxmaster }
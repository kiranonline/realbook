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
    country:{
        type:Sequelize.STRING(100),
        allowNull: true
    },
    currency:{
        type: Sequelize.STRING,
        allowNull:true
    },
    tax_rate:{
        type:Sequelize.DECIMAL(2),
        allowNull:true
    },
    from_dt:{
        type:Sequelize.DATE,
    },
    to_dt:{
        type:Sequelize.DATE,
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
    }
},{
    timestamps: false,
    freezeTableName: true,
    tableName: 'taxmaster'
});


module.exports={ taxmaster }
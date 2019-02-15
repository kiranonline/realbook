const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


//component
//sellingcompany modal
const vitem = sequelize.define('vitem', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    status:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    cid:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    vid:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    cid:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    segid:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    rank:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    item_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    unit_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    qty:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    amount:{
        type:Sequelize.DECIMAL(10, 2),
        allowNull: false,
    },
    rlb_item_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'vitem'
});


module.exports={ vitem }
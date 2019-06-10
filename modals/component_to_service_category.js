const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


//component
//sellingcompany modal
const component_to_service = sequelize.define('component_to_service', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    component_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    service_category:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'component_to_service'
});



module.exports={ component_to_service }
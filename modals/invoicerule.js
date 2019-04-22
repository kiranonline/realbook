const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
//component
//sellingcompany modal
const invoicerule = sequelize.define('invoicerule', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    company_name:{
        type:Sequelize.STRING,
        allowNull : true
    },
    party_name:{
        type:Sequelize.STRING,
        allowNull : true
    },
    sbu:{
        type:Sequelize.STRING,
        allowNull : true
    },
    invoice_date:{
        type:Sequelize.DATEONLY,
        allowNull : true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'invoicerule'
});


module.exports={ invoicerule }
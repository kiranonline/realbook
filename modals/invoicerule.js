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
    company_id:{
        type:Sequelize.INTEGER,
        allowNull : true
    },
    party_id:{
        type:Sequelize.STRING,
        allowNull : true
    },
    sbu_id:{
        type:Sequelize.INTEGER,
        allowNull : true
    },
    invoice_date:{
        type:Sequelize.STRING,
        validate:{
            isIn: [['check_in_date','check_out_date','invoice_date','manual']]
        }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'invoicerule'
});


module.exports={ invoicerule }
const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const customermaster = sequelize.define('customermaster',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    client_ref_no:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_mobile_no:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_address:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_country:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_email_id:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_file_handler:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_legal_status:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_state:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_city:{
        type:Sequelize.STRING,
        allowNull:true
    },
    customer_work_no:{
        type:Sequelize.STRING,
        allowNull:true
    },
    gst_no_of_customer:{
        type:Sequelize.STRING,
        allowNull:true
    },
    uae_fze_gst_no:{
        type:Sequelize.STRING,
        allowNull:true
    },
    contact_persion:{
        type:Sequelize.STRING,
        allowNull:true
    },
    credit_cash_customer:{
        type:Sequelize.STRING,
        allowNull:true
    },
    currency:{
        type:Sequelize.STRING,
        allowNull:true
    },
    pan_no:{
        type:Sequelize.STRING,
        allowNull:true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'customermaster'
});


module.exports={ customermaster }


const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const ledgermaster = sequelize.define('ledgermaster', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ledger_nature:{
        type:Sequelize.STRING,
        allowNull: false,
        validate:{
            isIn: [['party-customer','party-vendor','tax','income','expense','liability','asset']]
        }
    },
    rlb_ledger_id:{
        type:Sequelize.STRING,
        allowNull: true
    },
    portal_id:{
        type:Sequelize.STRING,
        allowNull: true
    },
    ledger_name:{
        type:Sequelize.STRING,
        allowNull: false,
        //check duplicate
    },  
    ledger_code:{
        type:Sequelize.STRING,
        allowNull: false,
        //check duplicate
    },
    ledger_group:{
        type:Sequelize.STRING,
        allowNull: false,
    }, 
    ledger_gstin:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    sac_code:{
        type:Sequelize.STRING,
        allowNull: true,
        defaultValue:null
    },
    tax_group:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    tax_name:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:null
    },
    rate:{
        type:Sequelize.STRING,
        allowNull: true,
        defaultValue:null
    },
    status:{
        type:Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1
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
    is_vbill:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    is_vcc:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    customer_id:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    supplier_id:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    party_flag:{
        type:Sequelize.STRING,
        allowNull:true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'ledgermaster'
});



ledgermaster.associate = function(models){
    ledgermaster.hasMany(models.voucher,{foreignKey: 'gstParty'});
    ledgermaster.hasMany(models.vdetail,{foreignKey: 'ledger'});
    ledgermaster.hasMany(models.vtax,{foreignKey: 'taxLedgerid'});
}





module.exports={ ledgermaster }
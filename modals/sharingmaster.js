const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


//sellingcompany modal
const sellingcompany = sequelize.define('sellingcompany', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    currency:{
        type:Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'sellingcompany'
});


//supplyingcompany modal
const supplyingcompany = sequelize.define('supplyingcompany', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    currency:{
        type:Sequelize.STRING,
        allowNull: false
    },
    selling_id:{
        type:Sequelize.INTEGER, 
        allowNull: false
    },
    selling_name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'supplyingcompany'
});



//component
const component = sequelize.define('component', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'component'
});




//sharingmaster
//component
const sharingmaster = sequelize.define('sharingmaster', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    selling_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    selling_name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    supplying_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    supplying_name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    component_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    component_name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    fromdate:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    todate:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    minshare:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    rule:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    value:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'sharingmaster'
});



module.exports={ sellingcompany,supplyingcompany,component,sharingmaster }


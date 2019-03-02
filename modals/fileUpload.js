const Sequelize = require('sequelize');
var sequelize = require('../services/conn');


const fileupload = sequelize.define('fileupload',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
        unique: true
    },
    filename:{
        type:Sequelize.STRING,
        allowNull:false
    },
    filetype:{
        type:Sequelize.STRING,
        allowNull:false
    },
    bookingmasterid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    cid:{
        type:Sequelize.INTEGER,
        allowNull:false   
    },
    segid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    status:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    bucketname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    foldername:{
        type:Sequelize.STRING,
        allowNull:false
    },
    s3link:{
        type:Sequelize.STRING(500),
        allowNull:false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    createdAt: 'FETCHED_ON',
    updatedAt: false,
    freezeTableName: true,
    tableName: 'fileupload'
});



module.exports={ fileupload }
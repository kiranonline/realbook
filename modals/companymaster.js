const Sequelize = require('sequelize');
var sequelize = require('../services/conn');
//component
//sellingcompany modal
const company_master = sequelize.define('company_master', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true
    },
    name:{
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
},{
    timestamps: true,
    freezeTableName: true,
    tableName: 'company_master'
});

company_master.associate = function(models){
    company_master.hasMany(models.voucher,{foreignKey: 'gstin',as:'gstin'});
    company_master.hasMany(models.voucher,{foreignKey: 'cid',as:'cid'});
    company_master.hasMany(models.voucher,{foreignKey: 'segid',as:'segid'});
    company_master.hasMany(models.vdetail,{foreignKey: 'cid',as:'ic'});
    company_master.hasMany(models.vdetail,{foreignKey: 'segid',as:'segid'});
    company_master.hasMany(models.vbill,{foreignKey: 'cid',as:'cid'});
    company_master.hasMany(models.vbill,{foreignKey: 'segid',as:'segid'});
    company_master.hasMany(models.vcc,{foreignKey: 'cid',as:'cid'});
    company_master.hasMany(models.vcc,{foreignKey: 'segid',as:'segid'});
    company_master.hasMany(models.vtax,{foreignKey: 'cid',as:'cid'});
    company_master.hasMany(models.vtax,{foreignKey: 'segid',as:'segid'});
}


module.exports={ company_master }
var config = require('config');
const Sequelize = require('sequelize');


//creatng connection
const sequelize = new Sequelize(config.get('dbConfig.database'),config.get('dbConfig.user'),config.get('dbConfig.password'), {
    host : config.get('dbConfig.host'),
    dialect : config.get('dbConfig.dialect'),
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});



//testing connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        sequelize.sync().then(()=>{
            console.log("synch...")
        }).catch((errors)=>{
            console.log("Unable to synch..."+errors);
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });




module.exports= sequelize;
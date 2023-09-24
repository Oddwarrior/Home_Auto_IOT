const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/utils/database.sqlite',
    // storage: 'C:/Users/VISHAKHA/Documents/Shashank/WebDev/IOT major project/server/src/utils/database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
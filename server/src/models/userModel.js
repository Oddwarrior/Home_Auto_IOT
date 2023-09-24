const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db')

const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});

User.sync()
    .then(() => {
        console.log('User model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing User model:', error);
    });

module.exports = User;
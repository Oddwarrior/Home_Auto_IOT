const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db')

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Assuming userId should be unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING // Add the 'name' field of type STRING
    }
});

User.sync()
    .then(() => {
        console.log('User model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing User model:', error);
    });

module.exports = User;
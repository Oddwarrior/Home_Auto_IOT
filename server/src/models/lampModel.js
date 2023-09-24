const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db')


const Lamp = sequelize.define('Lamp', {
    userId: {
        type: DataTypes.INTEGER, // Assuming userId is an integer
        allowNull: false,
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lampId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // primaryKey: true,        // Set lampId as the primary key
        // autoIncrement: true,      // Enable auto-increment
    },
    status: {
        type: DataTypes.ENUM('on', 'off'), // ENUM for on/off status
        defaultValue: 'off', // Default status is 'off'
        allowNull: false,
    },
});

// Synchronize the model with the database
Lamp.sync()
    .then(() => {
        console.log('Lamp model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing Lamp model:', error);
    });

module.exports = Lamp;

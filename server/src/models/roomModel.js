// rooms.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db')

const Room = sequelize.define('Room', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Room.sync()
    .then(() => {
        console.log('Room model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing Room model:', error);
    });

module.exports = Room;

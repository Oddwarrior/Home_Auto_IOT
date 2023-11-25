// socketSetup.js - Separate file for Socket.io setup

const socketIO = require('socket.io');

function initializeSocket(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A Raspberry Pi has connected to the server.');

        // Additional handling for specific socket if needed
        socket.on('disconnect', () => {
            console.log('Raspberry Pi disconnected from the server.');
            // Additional cleanup or handling when disconnected
        });
    });
    return io;
}

module.exports = initializeSocket;

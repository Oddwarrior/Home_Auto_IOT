const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

// Importing the Socket.io setup function
const initializeSocket = require('./src/utils/socketSetup');
// Initialize Socket.io by passing the server instance
const io = initializeSocket(server);
module.exports = io;

const port = 3000;
//socket

const lampController = require('./src/controllers/lampController')
const userController = require('./src/controllers/userController')

app.use(express.json()); // Parse JSON request bodies
app.use(cors());

app.get('/', async (req, res) => res.json("Welcome to IOT project!"))
// GET API to get status of all lamps in a room
app.get('/api/lamps/:room', userController.verifyUser, lampController.getStatus);
app.post('/api/lamps/add', userController.verifyUser, lampController.addLamp);
app.post('/api/lamps/delete', userController.verifyUser, lampController.deleteLamp);
app.post('/api/lamps/change-status', userController.verifyUser, lampController.changeStatus);

//rooms api
app.post('/api/rooms/add', userController.verifyUser, lampController.addRoom);
app.post('/api/rooms/delete', userController.verifyUser, lampController.deleteRoom);
app.get('/api/rooms', userController.verifyUser, lampController.getRooms);

//user apis
app.post('/api/user/register', userController.register);
app.post('/api/user/login', userController.login);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



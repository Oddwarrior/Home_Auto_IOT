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
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

app.get('/', async (req, res) => res.json("Welcome to IOT project!"))
// GET API to get status of all lamps in a room
app.get('/api/lamps/:room', lampController.getStatus);
app.post('/api/lamps/add', lampController.addLamp)
// POST API to change status of a lamp
app.post('/api/lamps/change-status', lampController.changeStatus);
app.get('/api/rooms/:userId', lampController.getRooms);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


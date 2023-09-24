const express = require('express');

const app = express();
const port = 3000;
const lampController = require('./src/controllers/lampController')
app.use(express.json()); // Parse JSON request bodies


app.get('/', async (req, res) => res.json("Welcome to IOT project!"))

// GET API to get status of all lamps in a room
app.get('/api/lamps/:room', lampController.getStatus);
app.post('/api/lamps/add', lampController.addLamp)
// POST API to change status of a lamp
app.post('/api/lamps/change-status', lampController.changeStatus);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


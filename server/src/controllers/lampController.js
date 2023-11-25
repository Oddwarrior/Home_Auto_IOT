// Sample data to store lamp status
const io = require('../../index')
const lamps = [
    { room: 1, lampId: 1, status: 'off' },
    { room: 2, lampId: 1, status: 'on' },
    { room: 3, lampId: 1, status: 'off' },
    // ... add more lamps and rooms as needed
];

const Lamp = require('../models/lampModel');
const User = require('../models/userModel')

const getRooms = async (req, res) => {
    //this function returns all rooms of user
    try {
        const userId = parseInt(req.params.userId);
        const rooms = await Lamp.findAll({
            attributes: ['room'],
            where: {
                userId: userId,
            },
            group: ['room']
        });

        if (rooms) {
            res.status(200).json({ message: 'Rooms found', rooms });
        }
        else {
            res.status(400).json({ message: 'No Rooms found' });
        }
    } catch (error) {
        console.log(error);
    }
}

const addLamp = async (req, res) => {
    try {
        const { userId, room, lampId } = req.body;
        const newLamp = Lamp.create({
            userId,
            room,
            lampId
        });
        const lamps = await Lamp.findAll();
        console.log("All lamps:", JSON.stringify(lamps, null, 2));

        return res.status(200).send("Lamp added succesfully");

    } catch (error) {
        console.log(error);
    }

}
const getStatus = async (req, res) => {
    {
        const roomNumber = parseInt(req.params.room);
        const lamps = await Lamp.findAll({

            where: {
                userId: 1,
            }
        });
        if (lampsInRoom.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const lampsInRoom = lamps.filter(lamp => lamp.room == roomNumber);
        if (lampsInRoom.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(lampsInRoom);
        console.log(lampsInRoom);
    }
}
const changeStatus = async (req, res) => {
    try {
        const { userId, room, lampId, status } = req.body;

        if (!room || !lampId || !status) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const lamp = await Lamp.findOne({
            where: {
                userId: userId,
                room: room,
                lampId: lampId,
            },
        });

        if (!lamp) {
            return res.status(404).json({ error: 'Lamp not found' });
        }

        lamp.status = status;
        await lamp.save();

        io.sockets.emit('statusChange', { status });
        res.json({ message: 'Lamp status updated successfully', lamp });
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getRooms,
    addLamp,
    getStatus,
    changeStatus
}
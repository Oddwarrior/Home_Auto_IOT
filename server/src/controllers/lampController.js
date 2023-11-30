// Sample data to store lamp status
const io = require('../../index')

const Lamp = require('../models/lampModel');
const User = require('../models/userModel')
const Room = require('../models/roomModel');

const addRoom = async (req, res) => {
    const userId = req.userId;
    const { room, name } = req.body;
    try {
        const newRoom = await Room.create({
            userId,
            room,
            name
        });
        return res.status(201).json({ message: 'Room added sucessfully', newRoom });

    } catch (error) {
        res.status(400).json({ message: 'Failed to add room ' });
        console.log(error);
    }
}
const deleteRoom = async (req, res) => {
    const userId = req.userId;
    const { room } = req.body;
    try {
        const deletedRoom = await Room.destroy({ where: { userId: userId, room: room } });
        if (deletedRoom === 0) {
            throw new Error('Room not found');
        }
        await Lamp.destroy({ where: { userId: userId, room: room } });
        return res.status(201).json({ message: 'Room deleted sucessfully', deletedRoom });

    } catch (error) {
        res.status(400).json({ message: 'Failed to delete room ', room });
        console.log(error);
    }
}

const getRooms = async (req, res) => {
    //this function returns all rooms of user
    try {
        const userId = req.userId;
        const rooms = await Room.findAll({
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
        const userId = req.userId;
        const { room, lampId } = req.body;
        const newLamp = Lamp.create({
            userId,
            room,
            lampId,
        });
        const lamps = await Lamp.findAll();
        console.log("All lamps:", JSON.stringify(lamps, null, 2));

        return res.status(200).send("Lamp added succesfully");

    } catch (error) {
        console.log(error);
    }
}

const deleteLamp = async (req, res) => {
    try {
        const userId = req.userId;
        const { room, lampId } = req.body; // Assuming lampId is sent as a route parameter

        // Check if the lamp exists for the given user before deleting
        const lampToDelete = await Lamp.findOne({ where: { userId, room, lampId } });

        if (!lampToDelete) {
            return res.status(404).send("Lamp not found or unauthorized to delete");
        }

        // If the lamp exists for the user, delete it
        await Lamp.destroy({ where: { userId, room, lampId } });

        // Optionally, retrieve the updated list of lamps after deletion
        const lamps = await Lamp.findAll();
        console.log("All lamps after deletion:", JSON.stringify(lamps, null, 2));

        return res.status(200).send("Lamp deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting lamp");
    }
}


const getStatus = async (req, res) => {
    {
        const userId = req.userId;
        const roomNumber = parseInt(req.params.room);
        const lamps = await Lamp.findAll({

            where: {
                userId: userId,
            }
        });

        if (lamps.length === 0) {
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
    addRoom,
    deleteRoom,
    getRooms,
    addLamp,
    deleteLamp,
    getStatus,
    changeStatus
}
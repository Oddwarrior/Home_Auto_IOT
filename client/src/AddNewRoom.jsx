import React, { useState } from 'react'
import { Modal } from '@mantine/core';
import useAuth from './UserContext';
import axios from 'axios';

function AddNewRoom({ addRoomOpen, setAddRoomOpen, rooms, setRooms }) {

    const [roomNumber, setRoomNumber] = useState('');
    const [roomName, setRoomName] = useState('');

    const handleRoomNumberChange = (e) => setRoomNumber(e.target.value);
    const handleRoomNameChange = (e) => setRoomName(e.target.value);
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (roomNumber && roomName) {
            const newRoom = {
                "room": roomNumber,
                "name": roomName
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Send the token in the 'Authorization' header
                }
            };

            // Call the API to add a room
            const response = await axios.post('http://localhost:3000/api/rooms/add', {
                "room": roomNumber, "name": roomName
            }, config);

            console.log(response);

            setRooms(prevRooms => [...prevRooms, newRoom]);
            setRoomNumber('');
            setRoomName('');
        }
        setAddRoomOpen(false);
    };


    const handleClose = () => {
        setAddRoomOpen(false);
    }

    return (
        <Modal opened={addRoomOpen} centered onClose={handleClose} >
            <form onSubmit={handleSubmit} className=' w-full h-full flex flex-col gap-4 '>
                <div className="flex flex-col gap-2">
                    <label htmlFor="roomNumber" >
                        Room Number:
                    </label>
                    <input
                        type="text"
                        id="roomNumber"
                        value={roomNumber}
                        onChange={handleRoomNumberChange}
                        className="border rounded-md p-2 outline-none"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="roomName" className="block mb-1">
                        Room Name:
                    </label>
                    <input
                        type="text"
                        id="roomName"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        className="border rounded-md p-2 outline-none"
                    />
                </div>
                <button type="submit" className="bg-black hover:bg-gray-700 duration-300 text-white font-semibold py-2 px-4 rounded-full">
                    Add Room
                </button>
            </form>
        </Modal>
    )
}

export default AddNewRoom
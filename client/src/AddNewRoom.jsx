import React, { useState } from 'react'
import { Modal } from '@mantine/core';

function AddNewRoom({ addRoomOpen, setAddRoomOpen }) {

    const [roomNumber, setRoomNumber] = useState('');
    const [roomName, setRoomName] = useState('');

    const handleRoomNumberChange = (e) => setRoomNumber(e.target.value);
    const handleRoomNameChange = (e) => setRoomName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (roomNumber && roomName) {
            // addRoom({ roomNo: roomNumber, name: roomName });
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
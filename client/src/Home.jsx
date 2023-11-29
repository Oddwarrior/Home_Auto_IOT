import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Replace this with the actual path to your Sidebar component
import RoomCard from './Roomcard';
import SearchBar from './Searchbar';
import AddNewRoom from './AddNewRoom';
import axios from 'axios';

const Home = () => {
    // let initial_rooms = [
    //     { roomNo: 101, name: 'Living Room' },
    //     { roomNo: 102, name: 'Bedroom' },
    //     // Add more room objects as needed
    // ];

    const [rooms, setRooms] = useState([])
    const [addRoomOpen, setAddRoomOpen] = useState(false)
    const userId = 1;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/rooms/${userId}`); // Replace '/api/rooms/' with your actual API endpoint
                setRooms(response.data.rooms);
                // console.log(rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setRooms([])
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="w-full flex flex-col gap-4 p-4">
                {/* Dashboard Content */}
                <h1 className="text-2xl font-bold p-4">Welcome to the Dashboard!</h1>
                <div className="bg-white p-4 rounded-2xl">
                    {/* Dashboard content goes here */}
                    <SearchBar />
                </div>

                <div className="bg-[#f8f9fa]   p-4 rounded-2xl  ">
                    <div className=' flex gap-2 items-center justify-between p-4'>
                        <div className=' flex flex-col gap-2'>
                            <div className='font-bold text-xl'>ROOMS</div>
                            <div className=''>{rooms?.length} rooms available </div>

                        </div>
                        <button onClick={() => setAddRoomOpen(true)}
                            className="bg-black rounded-full  hover:bg-gray-700 duration-300 text-white font-semibold py-2 px-4">
                            Add new Room
                        </button>
                        <AddNewRoom addRoomOpen={addRoomOpen} setAddRoomOpen={setAddRoomOpen} rooms={rooms} setRooms={setRooms} />
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {rooms.map((room, index) => (
                            <RoomCard key={index} roomNumber={room.room} alias={room.name} rooms={rooms} setRooms={setRooms} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

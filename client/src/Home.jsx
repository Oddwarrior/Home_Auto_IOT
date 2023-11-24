import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Replace this with the actual path to your Sidebar component
import RoomCard from './Roomcard';
import SearchBar from './Searchbar';

const Home = () => {
    let initial_rooms = [
        { roomNumber: 101, name: 'Living Room' },
        { roomNumber: 102, name: 'Bedroom' },
        // Add more room objects as needed
    ];
    const [rooms, setRooms] = useState(initial_rooms)

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
                            <div className=''>5 rooms available </div>

                        </div>
                        <button
                            className="bg-black rounded-full  hover:bg-gray-700 duration-300 text-white font-semibold py-2 px-4">
                            Add new Room
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 py-4">
                        {rooms.map((room, index) => (
                            <RoomCard key={index} roomNumber={room.roomNumber} alias={room.name} rooms={rooms} setRooms={setRooms} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

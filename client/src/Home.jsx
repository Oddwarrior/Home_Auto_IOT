import React from 'react';
import Sidebar from './Sidebar'; // Replace this with the actual path to your Sidebar component
import RoomCard from './Roomcard';

const Home = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-grow p-4">
                {/* Dashboard Content */}
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="bg-white p-4 rounded-lg">
                    {/* Dashboard content goes here */}
                    Welcome to the Dashboard!
                    <div className=' grid grid-cols-4 gap-4 py-4'>
                        <RoomCard />
                        <RoomCard />
                        <RoomCard />
                        <RoomCard />
                        <RoomCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

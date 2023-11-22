import { useState } from 'react';

const Dashboard = () => {
    const [rooms, setRooms] = useState([
        { id: 1, roomNumber: 'Room 101', bulbs: [{ id: 1, status: 'On' }, { id: 2, status: 'Off' }] },
        { id: 2, roomNumber: 'Room 102', bulbs: [{ id: 1, status: 'Off' }] },
    ]);

    const [newRoomInput, setNewRoomInput] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showAllRooms, setShowAllRooms] = useState(true);

    const handleRoomAdd = () => {
        if (newRoomInput.trim() !== '') {
            const newRoom = {
                id: rooms.length + 1,
                roomNumber: newRoomInput,
                bulbs: [],
            };
            setRooms([...rooms, newRoom]);
            setNewRoomInput('');
        }
    };

    const handleBulbAdd = () => {
        if (selectedRoom) {
            const newBulb = {
                id: selectedRoom.bulbs.length + 1,
                status: 'On', // Adding a new bulb sets its status to 'On'
            };
            const updatedRooms = rooms.map((room) =>
                room.id === selectedRoom.id ? { ...room, bulbs: [...room.bulbs, newBulb] } : room
            );
            setRooms(updatedRooms);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-64">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-2xl font-semibold">Dashboard</h2>
                </div>
                <nav className="mt-4">
                    <ul>
                        <li
                            onClick={() => setShowAllRooms(true)}
                            className={`py-2 px-4 cursor-pointer hover:bg-gray-700 transition duration-300 ${showAllRooms ? 'bg-gray-700' : ''
                                }`}
                        >
                            <span className="mr-2">🏠</span>All Rooms
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {showAllRooms ? (
                    <div>
                        <h2 className="text-2xl font-semibold">Rooms</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rooms.map((room) => (
                                <li
                                    key={room.id}
                                    onClick={() => {
                                        setSelectedRoom(room);
                                        setShowAllRooms(false);
                                    }}
                                    className="bg-white rounded shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-300"
                                >
                                    <h3 className="text-3xl font-semibold mb-2">{room.roomNumber}</h3>
                                    <p>Bulbs: {room.bulbs.length}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Enter Room Number"
                                value={newRoomInput}
                                onChange={(e) => setNewRoomInput(e.target.value)}
                                className="border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={handleRoomAdd}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Add Room
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {selectedRoom && (
                            <>
                                <h2 className="text-2xl font-semibold">{selectedRoom.roomNumber}</h2>
                                <div className="flex flex-wrap mt-4">
                                    {selectedRoom.bulbs.map((bulb) => (
                                        <div
                                            key={bulb.id}
                                            className={`w-8 h-8 flex items-center justify-center rounded border border-gray-400 m-1 ${bulb.status === 'On' ? 'bg-yellow-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span className="text-xs font-semibold">{bulb.id}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={handleBulbAdd}
                                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                    >
                                        Add Bulb
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

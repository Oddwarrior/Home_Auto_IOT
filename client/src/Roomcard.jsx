import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Tooltip, Menu } from '@mantine/core';
import { FaSync } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import useAuth from './UserContext';
import axios from 'axios';

const RoomCard = ({ roomNumber, alias, rooms, setRooms }) => {
    const { token } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sync, setSync] = useState(false);
    // let initialLamps = [{ "number": 1, "status": "on" }]
    const [lamps, setLamps] = useState([])
    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Send the token in the 'Authorization' header
                }
            };
            const response = await fetch(`http://localhost:3000/api/lamps/${roomNumber}`, config);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setLamps(data);

            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {


        fetchData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addLamp = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Send the token in the 'Authorization' header
            }
        };

        const newLamp = {
            "room": roomNumber,
            "lampId": lamps?.length + 1
        };
        const response = await axios.post('http://localhost:3000/api/lamps/add', newLamp, config);

        setLamps([...lamps, newLamp]);
    };
    const deleteLamp = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Send the token in the 'Authorization' header
            }
        };

        const response = await axios.post('http://localhost:3000/api/lamps/delete', {
            "room": roomNumber,
            "lampId": lamps?.length + 1
        }, config);

    };

    const deleteRoom = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Send the token in the 'Authorization' header
            }
        };

        const response = await axios.post('http://localhost:3000/api/rooms/delete', {
            "room": roomNumber
        }, config);

        console.log(response);
        const updatedRooms = rooms.filter((room) => room.room !== roomNumber);
        setRooms(updatedRooms);
        console.log(rooms);
    };

    const syncData = () => {
        setSync(true);
        fetchData();
        setSync(false);
    }

    return (
        <div className="border w-full h-full rounded-xl p-4 cursor-pointer   duration-300 relative">
            <div onClick={openModal} className=' flex flex-col gap-1'>
                <div className="text-lg font-bold flex">
                    <h1>{`Room ${roomNumber}`}</h1>
                </div>
                <div className="text-sm text-gray-500">{`${alias}`}</div>
            </div>

            {/*Menu*/}

            <Menu shadow="md" position="right-end"  >
                <Menu.Target>
                    <h1 className=' absolute right-2 top-5'><BsThreeDotsVertical /></h1>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<MdOutlineDelete color='red' />} onClick={deleteRoom} >
                        Delete
                    </Menu.Item>

                    {/* Other items ... */}
                </Menu.Dropdown>
            </Menu>
            {/* Modal */}
            <Modal opened={isModalOpen} onClose={closeModal} size="xl" >
                <div className="w-full h-full  items-center justify-center px-4 pb-2 rounded-lg cursor-default">
                    <section className=' flex gap-4 items-center'>
                        <h2 className="text-xl font-bold">{`Room : ${roomNumber}`}</h2>

                        <Tooltip label="Sync" position="right" offset={5} onClick={fetchData}>
                            <h1><FaSync className={sync ? 'animate-spin' : ''} /></h1>
                        </Tooltip>
                    </section>
                    <p className="text-sm text-gray-600 mb-4">alias</p>
                    {/* lamps */}
                    {lamps.length == 0 && <div className=' p-2 '>Lamps not added .</div>}
                    <div className="space-y-4">
                        {lamps.map((lamp, index) => (
                            <div key={lamp.id} className="flex items-center justify-between p-2 border rounded-md">
                                <span className="text-lg font-bold">{`Lamp ${lamp.lampId}`}</span>
                                {/* <span onClick={deleteLamp}>delete</span> */}
                                <span className={`rounded-full h-4 w-4 ${lamp.status == 'on' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            </div>
                        ))}
                    </div>

                    {/* Buttons*/}
                    <div className=' flex gap-2 pt-6'>
                        <button
                            className="bg-black rounded-full  hover:bg-gray-700 duration-300 text-white font-semibold py-2 px-4"
                            onClick={addLamp} >
                            Add Lamp
                        </button>
                        {/* <button className="rounded-full text-gray-500 border duration-300 hover:bg-gray-200 font-semibold py-2 px-4" onClick={closeModal}>
                            Close
                        </button> */}

                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RoomCard;

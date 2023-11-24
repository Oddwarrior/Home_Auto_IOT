import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Tooltip, Button } from '@mantine/core';
import { FaSync } from "react-icons/fa";

const RoomCard = ({ roomNumber, alias }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sync, setSync] = useState(false);

    let initialLamps = [{ "number": 1, "status": "on" }]
    const [lamps, setLamps] = useState(initialLamps)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addLamp = () => {
        const newLamp = {
            number: lamps.length + 1,
            status: "off", // Default status is off for a new lamp
        };
        setLamps([...lamps, newLamp]);
    };

    const syncData = () => {
        setSync(!sync)
    }
    return (
        <div className="border w-full h-full rounded-lg p-4 shadow-md cursor-pointer" onClick={openModal}>
            <h2 className="text-lg font-bold">Room 101</h2>
            <p className="text-sm text-gray-500">alias</p>

            {/* Modal */}
            <Transition
                show={isModalOpen}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                {(ref) => (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50" onClick={closeModal}>
                        <div ref={ref} className="bg-white min-w-[500px] p-6 rounded-lg cursor-default" onClick={(e) => e.stopPropagation()}>
                            <section className=' flex gap-4 items-center'>
                                <h2 className="text-xl font-bold">Room : 101 </h2>
                                <Tooltip label="Sync" position="right" offset={5} onClick={syncData}>
                                    <h1><FaSync className={sync ? 'animate-spin' : ''} /></h1>
                                </Tooltip>
                            </section>
                            <p className="text-sm text-gray-600 mb-4">alias</p>
                            {/* lamps */}
                            <div className="space-y-4">
                                {lamps.map((lamp) => (
                                    <div key={lamp.id} className="flex items-center justify-between p-2 border rounded-md">
                                        <span className="text-lg">{`Lamp ${lamp.number}`}</span>
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
                                <button className="rounded-full text-gray-500 border duration-300 hover:bg-gray-200 font-semibold py-2 px-4" onClick={closeModal}>
                                    Close
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

export default RoomCard;

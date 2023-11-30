import React from 'react';
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
    return (
        <div className="flex h-screen bg-gray-100  gradient ">
            {/* Sidebar */}
            <div className="w-64 bg-black text-gray-100">
                {/* Logo */}
                <div className="flex items-center justify-center h-20 border-b border-gray-700">
                    <div className="h-10 w-auto font-bold" >
                        SmartLamps
                    </div>
                </div>

                {/* Sidebar Items */}
                <div className="p-4 rounded-xl">
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Profile
                    </a>
                    {/* Add more sidebar items as needed */}
                </div>
            </div>

            {/* Main Content */}
        </div >
    );
};

export default Sidebar;

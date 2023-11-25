import React from 'react';

const Sidebar = () => {
    return (
        <div className="flex h-screen bg-gray-100  gradient ">
            {/* Sidebar */}
            <div className="w-64 bg-black text-gray-100">
                {/* Logo */}
                <div className="flex items-center justify-center h-20 border-b border-gray-700">
                    <img
                        className="h-10 w-auto"
                        src="path_to_your_logo.png"
                        alt="Logo"
                    />
                </div>

                {/* Sidebar Items */}
                <div className="p-4">
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Item 1
                    </a>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        Item 2
                    </a>
                    {/* Add more sidebar items as needed */}
                </div>
            </div>

            {/* Main Content */}
        </div>
    );
};

export default Sidebar;

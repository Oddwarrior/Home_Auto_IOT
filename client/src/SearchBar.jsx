import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center gap-2 border rounded-2xl p-2 px-4">
            <IoSearchOutline className=' text-gray-600' />
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
                className="outline-none w-full"
            />
        </div>
    );
};

export default SearchBar;

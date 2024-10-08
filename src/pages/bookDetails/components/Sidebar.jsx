// src/Sidebar.js
import React from 'react';

const Sidebar = () => {
    return (
        <div className="flex flex-col w-64 h-full bg-gray-800 text-white shadow-lg">
            <h2 className="text-2xl font-bold text-center p-4">Sidebar</h2>
            <ul className="flex flex-col">
                <li className="hover:bg-gray-700 p-4 cursor-pointer">Add A book</li>
                <li className="hover:bg-gray-700 p-4 cursor-pointer">Booklist</li>
                <li className="hover:bg-gray-700 p-4 cursor-pointer">My Library</li>
                <li className="hover:bg-gray-700 p-4 cursor-pointer">log Out</li>
            </ul>
        </div>
    );
};

export default Sidebar;
import React, { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfileBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-gray-500" />
          )}
        </div>
        <span className="font-medium text-gray-700">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <Link
            to="/account-settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Link>
          <Link
            to="/login"
            className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserProfileBar;
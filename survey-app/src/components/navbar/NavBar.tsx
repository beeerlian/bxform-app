import react from '@/assets/react.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center w-full">
      <div className="text-white text-lg font-bold">
        <img src={react} />
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white">
          Home
        </Link>
        <div className="relative">
          <img
            src="/path/to/profile/logo.png"
            alt="Profile"
            onClick={toggleDropdown}
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Profile
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

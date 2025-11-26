import React from "react";
import { Bell, Search, Menu } from "lucide-react";

const Topbar = ({ searchText, setSearchText }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Left Section - Logo + Menu */}
        <div className="flex items-center space-x-4">
          <Menu size={22} className="text-gray-700 cursor-pointer" />
          <h1 className="text-lg font-bold text-green-800 tracking-wide">
            Demonstration
          </h1>
        </div>

        {/* Center - Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 w-1/3 shadow-inner">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent w-full focus:outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right - Notification + Profile */}
        <div className="flex items-center space-x-6">
          <div className="relative cursor-pointer hover:bg-green-50 p-2 rounded-full transition-all">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">
              3
            </span>
          </div>

          <div className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 px-3 py-2 rounded-full transition-all">
            <img
              src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
              alt="Admin"
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
            />

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">
                Pratyaksh
              </span>
              <span className="text-xs text-gray-500">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;


import React from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <div className="bg-white shadow-sm mb-6 p-3 md:p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-2 md:gap-4">
        <div className="flex-shrink-0">
          <span className="text-xs text-gray-500">Home Dashboard V2</span>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">CNAPP Dashboard</h1>
        </div>
        <div className="flex flex-grow sm:flex-grow-0 items-center space-x-2 md:space-x-4">
          <div className="relative flex-grow max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-gray-50 border border-gray-300 text-gray-700 text-xs md:text-sm rounded-md py-1.5 px-2 md:py-2 md:px-3 pl-8 md:pl-10 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button className="flex items-center text-xs md:text-sm text-gray-700 bg-white border border-gray-300 rounded-md py-1.5 px-2 md:py-2 md:px-3 hover:bg-gray-50">
            Last 2 days <ChevronDownIcon className="h-3 w-3 md:h-4 md:w-4 ml-1 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
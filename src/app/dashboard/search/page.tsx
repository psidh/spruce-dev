'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Popup from '@/components/Pop';

// Import necessary modules

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [state, setState] = useState<Boolean>(false);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    setSearchResults([]);
    try {
      const response = await fetch(`/api/dashboard?id=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Server error:', response);
        console.error('Failed to fetch data from the server');
        return;
      }

      const data = await response.json();
      setState(true);
      setSearchResults(data);
    } catch (error) {
      console.error('Client error:', error);
    }
  };

  const openPopup = (item: any) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setShowPopup(false);
  };

  return (
    <div className="flex justify-between">
      <div className='w-[25%]'>
        <Sidebar />
      </div>
      <div className="w-[75%] mr-8 flex-shrink-0">
        <label
          htmlFor="searchInput"
          className="block text-3xl text-black font-semibold mr-4 mt-8 mb-8  flex-grow "
        >
          Search
          <hr className="border border-gray-100 mt-1 mb-2" />
        </label>

        <form>
          <div className="mb-1 flex rounded-md ">
            <input
              type="text"
              id="searchInput"
              className="px-4 border-b border-gray-300 w-[80%] py-3 block  text-xl 
              outline-none"
              placeholder="enter your Dumper ID . . . "
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="ml-2 px-4 text-center w-[20%] py-2 text-2xl transition duration-200
               font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 hover:rounded-full
              "
            >
              Search
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-700 mr-4 mt-8">
               Results
            </h2>
            <hr className="border border-gray-100  my-4" />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {searchResults.map((item: any, index: number) => (
                <div className="rounded-lg overflow-hidden my-6 shadow-xl border border-gray-200 p-6" key={index}>
                  <h1 className="text-2xl font-semibold mb-4">
                    DumperId {item.dumperId}
                  </h1>
                  <h2 className='text-xl font-normal mb-4'>
                    Date: {item.date}                  
                  </h2>
                  <div className="flex justify-end">
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                      onClick={() => openPopup(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(searchResults.length === 0 && state === true )&& (
          <div className="mt-4 text-red-500 mx-4">
            No results found. Please try again.
          </div>
        )}

        {showPopup && (
          <Popup onClose={closePopup} item={selectedItem} />
        )}
      </div>
    </div>
  );
}

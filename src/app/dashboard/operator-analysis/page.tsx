'use client';
import BarGraph from '@/components/BarGraph';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Popup from '@/components/Pop';
import Image from 'next/image';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [state, setState] = useState<Boolean>(false);

  const [totalVolume, setVolume] = useState<number>(0);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    setSearchResults([]);
    try {
      const response = await fetch(`/api/analysis?id=${searchTerm}`, {
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
      let volume = 0;

      for (let i = 0; i < data.length; i++) {
        volume += data[i].availableCapacity;
      }
      setState(true);
      setVolume(volume);
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
    <div className="flex justify-between min-h-screen">
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="w-[75%]">
        <div className="">
          <label
            htmlFor="searchInput"
            className="block text-3xl text-black font-semibold mr-4 mt-8 mb-8  flex-grow "
          >
            Operator Analysis
            <hr className="border border-gray-100 mt-1 mb-2" />
          </label>

          <p className="my-6 text-xl font-light">
            Enter a{' '}
            <span className="bg-blue-200 px-2 py-1 rounded-md">OperatorID</span>{' '}
            to get analysis of the particular operator
          </p>

          <form>
            <div className="mb-1 flex rounded-md ">
              <input
                type="text"
                id="searchInput"
                className="px-4 border-b border-gray-300 w-[80%] py-3 block  text-xl
              outline-none"
                placeholder="enter your Operator ID . . . "
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
                Get Analysis
              </button>
            </div>
          </form>

          {searchResults.length > 0 && (
            // <div className="mt-4">
            //   <h2 className="text-xl font-semibold text-gray-700 mr-4 mt-8">
            //     Results
            //   </h2>
            //   <hr className="border border-gray-100  my-4" />
            //   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            //     {searchResults.map((item: any, index: number) => (
            //       <div
            //         className="rounded-lg overflow-hidden my-6 shadow-xl border border-gray-200 p-6"
            //         key={index}
            //       >
            //         <h1 className="text-2xl font-semibold mb-4">
            //           DumperId {item.dumperId}
            //         </h1>
            //         <h2 className="text-xl font-normal mb-4">
            //           Date: {item.date}
            //         </h2>
            //         <div className="flex justify-end">
            //           <button
            //             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            //             onClick={() => openPopup(item)}
            //           >
            //             View Details
            //           </button>
            //         </div>
            //       </div>
            //     ))}
            //   </div>
            // </div>
            <div>
              <div>
                <p className="text-3xl mt-12">Total Coal Extracted (perday)</p>
                <hr />

                <div className="relative flex justify-center items-center flex-row text-white">
                  <img
                    src="/total.jpeg"
                    alt="green card"
                    style={{
                      height: '40vh',
                    }}
                  />
                  <div
                    className="absolute bottom-[27%]  h-[10%] flex flex-col 
          justify-end  pl-[20%] pb-[3.7%] left-[22.5%] items-start  transform text-center"
                  >
                    <p className="text-black text-4xl">{totalVolume}/ 70 Ton</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-3xl mt-12">Remaining Trips</p>
                <hr />

                <div className="relative flex justify-center items-center flex-row text-white">
                  <img
                    src="/total.jpeg"
                    alt="green card"
                    style={{
                      height: '40vh',
                    }}
                  />
                  <div
                    className="absolute bottom-[27%]  h-[10%] flex flex-col 
        justify-end  pl-[20%] pb-[3.7%] left-[24.5%] items-start  transform text-center"
                  >
                    <p className="text-black text-5xl">5 / 7 </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {searchResults.length === 0 && state === true && (
            <div className="mt-4 text-red-500 mx-4">
              No results found. Please try again.
            </div>
          )}

          {showPopup && <Popup onClose={closePopup} item={selectedItem} />}
        </div>
      </div>
    </div>
  );
}

// const IndexPage: React.FC = () => {
//   return (
//     <div className='flex justify-between '>
//       <div className='w-[25%]'>
//         <Sidebar />
//       </div>

//       <div className='w-[75%]'>
//         <BarGraph />
//       </div>
//     </div>
//   );
// };

// export default IndexPage;

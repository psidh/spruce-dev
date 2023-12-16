'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TableDataItem from '../../../utils/table';
import { toast, Toaster } from 'react-hot-toast';
import {
  isValidDate,
  isValidDumperId,
  isValidStatus,
  isValidCapacity,
  isValidOperatorId,
  isValidTime,
} from '../../../utils/validation';

const initialState = {
  date: '',
  dumperId: '',
  status: '',
  currentCapacity: 0,
  availableCapacity: 0,
  operatorId: '',
  time: '',
};
export default function Table(): JSX.Element {
  const [table, setTable] = useState<TableDataItem>(initialState);

  const handlePushData = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(table),
      });

      const responseData = await response.json(); // Parse response JSON

      console.log('Response:', response);

      if (response.ok) {
        toast.success('Pushed Data');
        setTable(initialState);
      } else {
        console.error('Server error:', responseData.error); // Log server error
        console.error('Failed to push data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTable({
      ...table,
      [e.target.name]: e.target.value,
    });
  };

  const labelClass = `flex items-center text-xl font-semibold text-blue-950`;

  const validateForm = (): boolean => {
    if (!isValidDate(table.date)) {
      toast.error('Invalid date format. Please use DD-MM-YYYY format.');
      return false;
    }

    if (!isValidDumperId(table.dumperId)) {
      toast.error(
        'Invalid DumperId. It must start with 2 letters and end with 4 digits.'
      );
      return false;
    }

    if (!isValidStatus(table.status)) {
      toast.error('Invalid status. It must be empty, filling, or full.');
      return false;
    }

    if (!isValidCapacity(table.currentCapacity)) {
      toast.error('Invalid current capacity. It cannot be less than 1.');
      return false;
    }

    if (!isValidCapacity(table.availableCapacity)) {
      toast.error('Invalid available capacity. It cannot be less than 1.');
      return false;
    }

    if (!isValidOperatorId(table.operatorId)) {
      toast.error(
        'Invalid OperatorId. It must start with 2 letters and end with 4 digits.'
      );
      return false;
    }

    if (!isValidTime(table.time)) {
      toast.error('Invalid time format. Please use HH:MM format.');
      return false;
    }

    return true;
  };

  return (
    <div className="flex justify-between">
      <Toaster />
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="w-[70%] mr-8 flex-grow ">
        <h1 className="block text-3xl text-black font-semibold mr-4 mt-8 mb-8  flex-grow ">
          Add Record <hr className="border border-gray-100 mt-1 mb-2" />
        </h1>
        <div className="mx-4 my-8 flex flex-col">
          <div className="space-y-4 flex flex-col justify-between w-[99%]">
            <div className="flex items-center justify-between">
              <label className={labelClass}>DATE</label>
              <div>
                <input
                  type="text"
                  name="date"
                  placeholder="DD-MM-YYYY"
                  value={table.date}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>DUMPER ID</label>
              <div>
                <input
                  type="text"
                  name="dumperId"
                  placeholder="Enter DUMPER ID"
                  value={table.dumperId}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>STATUS</label>
              <div>
                <input
                  type="text"
                  name="status"
                  placeholder="Enter STATUS"
                  value={table.status}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>CURRENT CAPACITY</label>
              <div>
                <input
                  type="number"
                  name="currentCapacity"
                  placeholder="Enter CURRENT CAPACITY"
                  value={table.currentCapacity}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>AVAILABLE CAPACITY</label>
              <div>
                <input
                  type="number"
                  name="availableCapacity"
                  placeholder="Enter AVAILABLE CAPACITY"
                  value={table.availableCapacity}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>OPERATOR ID</label>
              <div>
                <input
                  type="text"
                  name="operatorId"
                  placeholder="Enter OPERATOR ID"
                  value={table.operatorId}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className={labelClass}>TIME</label>
              <div>
                <input
                  type="text"
                  name="time"
                  placeholder="Enter TIME"
                  value={table.time}
                  onChange={handleInputChange}
                  className="ml-2 p-2 rounded-md border border-[#969696]"
                />
              </div>
            </div>
          </div>

          <button
            onClick={validateForm}
            // disabled={!validateForm()} 
            className={`py-2 px-8 my-6 border text-center rounded-md bg-blue-600 text-white hover:bg-blue-800`}>
            Push Data
          </button>
        </div>
      </div>
    </div>
  );
}
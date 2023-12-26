'use client';
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import toast from 'react-hot-toast';

interface DataRow {
  date: string;
  dumperID: string;
  status: number;
  carryingCapacity: number;
  availableCapacity: number;
  operatorID: number;
}

const Page: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [pushCount, setPushCount] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateData = () => {
      // Clone the existing data
      const newData = [...data];

      // Increment dumperID, carrying capacity, and operatorID
      const lastRow = newData[newData.length - 1];
      const newDumperID = `DL${1000 + 0}`;
      const newCarryingCapacity = lastRow ? lastRow.carryingCapacity + 4 : 4;
      const updatedCarryingCapacity = newCarryingCapacity >= 20 ? 0 : newCarryingCapacity;
      const newOperatorID = lastRow ? lastRow.operatorID + 0 : 1;

      // Add a new ro3
      newData.push({
        date: new Date().toLocaleString(),
        dumperID: newDumperID,
        status: lastRow && lastRow.status < 5 ? lastRow.status + 1 : 1,
        carryingCapacity: updatedCarryingCapacity,
        availableCapacity: 20,
        operatorID: newOperatorID,
      });

      // Update the state
      setData(newData);

      // Increment push count
      setPushCount((prevCount) => prevCount + 1);

      // Check if the status reaches 5 or the push count is 5
      if ((lastRow && lastRow.status === 4) || pushCount === 5) {
        // Show notification and reset status
        toast.success(`Dumper ${lastRow.dumperID} status is full!`);
        toast.success(`YOUR Dumper ${lastRow.dumperID} status is full!`);
        const newNotificationCount = notificationCount + 1;
        setNotificationCount(newNotificationCount);

        // Clear the interval after 5 pushes
        clearInterval(interval);
      }
    };

    // Start the interval
    interval = setInterval(updateData, 7000); // Update every 5 seconds

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [data, notificationCount, pushCount]);

  return (
    <div className="flex justify-between">
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="p-16">
        <table className="table-auto w-full bg-blue-100 text-blue-800">
          <thead>
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">DumperID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Carrying Capacity</th>
              <th className="px-4 py-2">Available Capacity</th>
              <th className="px-4 py-2">OperatorID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="bg-blue-200">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.dumperID}</td>
                <td className="px-4 py-2">
                  {'🟠'.repeat(row.status) + '⚪️'.repeat(5 - row.status)}
                </td>
                <td className="px-4 py-2">{row.carryingCapacity}</td>
                <td className="px-4 py-2">{row.availableCapacity}</td>
                <td className="px-4 py-2">{row.operatorID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;

import React from 'react';
import { Header } from '../components';

const Activity = () => {
  // Sample data
  const eventData = {
    eventName: 'PIXEL 2023',
    organization: 'CS Society',
    venue: 'ELL',
    details: 'This event for final year student of school of Computer Science to display their FYP',
    startDate: '2023-06-20',
    startTime: '10:00',
    endDate: '2023-06-21',
    endTime: '12:00',
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Main" title="Activity" />

      <div className="flex flex-wrap">
        <div className="w-full md:w-3/4 mt-3">
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-gray-700 font-bold mb-2">
              Event Name
            </label>
            <p>{eventData.eventName}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="organization" className="block text-gray-700 font-bold mb-2">
              Organization
            </label>
            <p>{eventData.organization}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="venue" className="block text-gray-700 font-bold mb-2">
              Event Venue
            </label>
            <p>{eventData.venue}</p>
          </div>

          <div className="mb-5">
            <label htmlFor="details" className="block text-gray-700 font-bold mb-2">
              Event Details
            </label>
            <p>{eventData.details}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
                Start Date
              </label>
              <p>{eventData.startDate}</p>
            </div>
            <div>
              <label htmlFor="startTime" className="block text-gray-700 font-bold mb-2">
                Start Time
              </label>
              <p>{eventData.startTime}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
                End Date
              </label>
              <p>{eventData.endDate}</p>
            </div>
            <div>
              <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">
                End Time
              </label>
              <p>{eventData.endTime}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
              // Add an event handler for the "Edit" button
            >
              Edit
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/4 mt-8 flex items-center justify-center">
          <img
            src="path/to/image.jpg"
            alt="Image"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Activity;

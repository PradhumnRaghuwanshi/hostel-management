import React from "react";
import { HomeIcon, UsersIcon, KeyIcon, SparklesIcon } from "@heroicons/react/24/solid";

const roomInfo = {
  roomNo: "A-203",
  type: "Double Sharing",
  floor: 2,
  block: "A",
  bed: "Bed-1",
  capacity: 2,
  occupied: 2,
  roommates: [
    { name: "Aman Sharma", id: "22CS0401", you: true },
    { name: "Rohit Singh", id: "22CS0407", you: false }
  ],
  facilities: [
    "Attached Bathroom",
    "Study Table",
    "WiFi Access",
    "Fan",
    "Cupboard"
  ],
  remarks: "Room cleaned on 20th April"
};

export default function RoomStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <HomeIcon className="h-10 w-10 text-blue-500" />
          <div>
            <div className="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-200">
              My Room Status
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-400">Last updated: 25-April-2025</div>
          </div>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
          <div>
            <div className="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
              <KeyIcon className="h-5 w-5 text-blue-600" /> Room Number:
            </div>
            <div className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mb-2">{roomInfo.roomNo}</div>
            <div className="mb-1 text-gray-700 dark:text-gray-200"><b>Type:</b> {roomInfo.type}</div>
            <div className="mb-1 text-gray-700 dark:text-gray-200"><b>Floor:</b> {roomInfo.floor}</div>
            <div className="mb-1 text-gray-700 dark:text-gray-200"><b>Block:</b> {roomInfo.block}</div>
            <div className="mb-1 text-gray-700 dark:text-gray-200"><b>Bed:</b> {roomInfo.bed}</div>
            <div className="text-gray-700 dark:text-gray-200"><b>Capacity:</b> {roomInfo.capacity} Students</div>
          </div>
          <div>
            <div className="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-green-500" /> Roommates
            </div>
            <ul className="space-y-1">
              {roomInfo.roommates.map(rm => (
                <li key={rm.id} className={rm.you ? "font-semibold text-blue-700 dark:text-blue-200" : "text-gray-700 dark:text-gray-200"}>
                  {rm.name} <span className="text-xs text-gray-400 ml-1">({rm.id}{rm.you ? ", You" : ""})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-7">
          <div className="font-bold text-gray-800 dark:text-gray-100 mb-1 flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-yellow-400" /> Facilities
          </div>
          <div className="flex flex-wrap gap-2">
            {roomInfo.facilities.map(fac => (
              <span key={fac}
                className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 px-3 py-1 rounded-full text-xs"
              >
                {fac}
              </span>
            ))}
          </div>
        </div>

        {/* Remarks/Actions */}
        <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">
          <b>Remarks:</b> {roomInfo.remarks}
        </div>
        <div className="flex gap-4 mt-4">
          <a
            href="/student/complaints"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            Raise Complaint
          </a>
          <a
            href="/student/request-room-change"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow"
          >
            Request Room Change
          </a>
        </div>
      </div>
    </div>
  );
}

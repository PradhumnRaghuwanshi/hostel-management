// RoomManagementPage.jsx
import React, { useState } from "react";
import AdminLayout from '../components/admin/AdminLayout'
import { BedDouble, Pencil, Trash2, Plus } from "lucide-react";

const initialRooms = [
  {
    roomNumber: "101",
    type: "single",
    acType: "ac",
    capacity: 1,
    occupied: 1,
    students: ["Rohan Mehta"],
    photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    facilities: ["AC", "Wi-Fi", "Study Table"],
    rent: 5000,
  },
];

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "",
    acType: "",
    capacity: 1,
    occupied: 0,
    photo: "",
    facilities: "",
    rent: ""
  });

  const handleDelete = (roomNumber) => {
    setRooms((prev) => prev.filter((room) => room.roomNumber !== roomNumber));
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      ...room,
      facilities: room.facilities.join(", ")
    });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedRoom = {
      ...formData,
      facilities: formData.facilities.split(",").map((f) => f.trim())
    };
    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.roomNumber === editingRoom.roomNumber ? updatedRoom : r))
      );
    } else {
      setRooms([...rooms, updatedRoom]);
    }
    setEditingRoom(null);
    setShowForm(false);
    setFormData({
      roomNumber: "",
      type: "",
      acType: "",
      capacity: 1,
      occupied: 0,
      photo: "",
      facilities: "",
      rent: ""
    });
  };

  return (
    <AdminLayout title="Room Management">
      <div className="px-4 sm:px-6 pb-10">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              setShowForm(true);
              setEditingRoom(null);
              setFormData({
                roomNumber: "",
                type: "",
                acType: "",
                capacity: 1,
                occupied: 0,
                photo: "",
                facilities: "",
                rent: ""
              });
            }}
            className="bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            <Plus className="h-4 w-4" /> Create Room
          </button>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.roomNumber}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.02] p-5 border"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Room #{room.roomNumber}</h2>
                <BedDouble className="h-5 w-5 text-blue-600" />
              </div>
              <img
                src={room.photo}
                alt={`Room ${room.roomNumber}`}
                className="rounded-md w-full h-40 object-cover mb-3"
              />
              <p className="text-sm text-gray-600 mb-1">Type: {room.type} | AC: {room.acType}</p>
              <p className="text-sm text-gray-600 mb-1">Capacity: {room.capacity}</p>
              <p className="text-sm text-gray-600 mb-1">Rent: ₹{room.rent}</p>
              <p className={`text-sm font-medium ${room.occupied > 0 ? "text-red-600" : "text-green-600"}`}>
                {room.occupied > 0 ? `Occupied (${room.occupied})` : "Available"}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedRoom(room)}
                  className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(room)} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(room.roomNumber)}
                    className="p-2 bg-red-100 rounded hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Room Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center px-4 py-10 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-3xl font-light text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {editingRoom ? "Edit Room" : "Create New Room"}
            </h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Room Number</label>
                <input type="text" className="w-full border px-3 py-2 rounded" required
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Room Type</label>
                <input type="text" className="w-full border px-3 py-2 rounded" required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">AC Type</label>
                <input type="text" className="w-full border px-3 py-2 rounded" required
                  value={formData.acType}
                  onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Capacity</label>
                <input type="number" className="w-full border px-3 py-2 rounded" required
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Occupied</label>
                <input type="number" className="w-full border px-3 py-2 rounded" required
                  value={formData.occupied}
                  onChange={(e) => setFormData({ ...formData, occupied: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Rent</label>
                <input type="number" className="w-full border px-3 py-2 rounded" required
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: parseInt(e.target.value) })}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Photo URL</label>
                <input type="text" className="w-full border px-3 py-2 rounded"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm text-gray-600">Facilities (comma-separated)</label>
                <input type="text" className="w-full border px-3 py-2 rounded"
                  value={formData.facilities}
                  onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
                />
              </div>
              <div className="col-span-2 text-right">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  {editingRoom ? "Update Room" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Room Detail View */}
      {!!selectedRoom && (
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto w-full h-full px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-blue-800">
                Room #{selectedRoom.roomNumber} Overview
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl font-light"
                onClick={() => setSelectedRoom(null)}
              >
                &times;
              </button>
            </div>

            <img
              src={selectedRoom.photo}
              alt={`Room ${selectedRoom.roomNumber}`}
              className="rounded-lg w-full h-80 object-cover mb-6 shadow-md border"
            />

            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong className="text-gray-900">Room Type:</strong> {selectedRoom.type}</p>
              <p><strong className="text-gray-900">AC Type:</strong> {selectedRoom.acType}</p>
              <p><strong className="text-gray-900">Capacity:</strong> {selectedRoom.capacity}</p>
              <p><strong className="text-gray-900">Occupied:</strong> {selectedRoom.occupied}</p>
              <p><strong className="text-gray-900">Rent:</strong> ₹{selectedRoom.rent}</p>
              <div>
                <strong className="text-gray-900">Facilities:</strong>
                <ul className="list-disc list-inside mt-2 pl-2 space-y-1">
                  {selectedRoom.facilities.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

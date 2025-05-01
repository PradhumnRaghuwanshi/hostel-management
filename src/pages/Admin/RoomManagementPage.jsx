import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { BedDouble, Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";

const facilityOptions = ["Wi-Fi", "Study Table", "Geyser", "Laundry", "AC", "Cooler"];

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "single",
    acType: "ac",
    capacity: 1,
    occupied: 0,
    rent: "",
    photo: "",
    facilities: []
  });
  const [editingRoom, setEditingRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://hostel-management-backend-qyvz.onrender.com/rooms");
        setRooms(response.data.data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      type: "single",
      acType: "ac",
      capacity: 1,
      occupied: 0,
      rent: "",
      photo: "",
      facilities: []
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  const handleFacilityChange = (facility) => {
    if (formData.facilities.includes(facility)) {
      setFormData((prev) => ({
        ...prev,
        facilities: prev.facilities.filter((f) => f !== facility)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facility]
      }));
    }
  };

  const handleEdit = (room) => {
    setFormData({
      ...room,
      facilities: room.facilities || []
    });
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleDelete = async (roomNumber) => {
    try {
      await axios.delete(`https://hostel-management-backend-qyvz.onrender.com/rooms/${roomNumber}`);
      setRooms((prev) => prev.filter((room) => room.roomNumber !== roomNumber));
      alert("Room deleted successfully!");
    } catch (err) {
      console.error("Error deleting room", err);
      alert("Failed to delete room. Please try again.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newRoom = {
      ...formData,
      capacity: parseInt(formData.capacity),
      occupied: parseInt(formData.occupied),
      rent: parseInt(formData.rent)
    };

    try {
      if (editingRoom) {
        await axios.put(`https://hostel-management-backend-qyvz.onrender.com/rooms/${editingRoom.roomNumber}`, newRoom);
        alert("Room updated successfully!");
      } else {
        await axios.post("https://hostel-management-backend-qyvz.onrender.com/rooms", newRoom);
        alert("Room created successfully!");
      }

      const res = await axios.get("https://hostel-management-backend-qyvz.onrender.com/rooms");
      setRooms(res.data.data || []);
      resetForm();
    } catch (err) {
      console.error("Error creating/updating room", err);
      alert("Failed to save room. Please try again.");
    }
  };

  return (
    <AdminLayout title="Room Management">
      <div className="px-4 sm:px-6 pb-10">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            <Plus className="h-4 w-4" /> Create Room
          </button>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.roomNumber} className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-[1.02] p-5 border">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">Room #{room.roomNumber}</h2>
                <BedDouble className="h-5 w-5 text-blue-600" />
              </div>
              <img src={room.photo} alt={`Room ${room.roomNumber}`} className="rounded-md w-full h-40 object-cover mb-3" />
              <p className="text-sm text-gray-600 mb-1">Type: {room.type} | AC: {room.acType}</p>
              <p className="text-sm text-gray-600 mb-1">Capacity: {room.capacity}</p>
              <p className="text-sm text-gray-600 mb-1">Rent: ₹{room.rent}</p>
              <p className={`text-sm font-medium ${room.occupied > 0 ? "text-red-600" : "text-green-600"}`}>
                {room.occupied > 0 ? `Occupied (${room.occupied})` : "Available"}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setEditingRoom(room)}
                  className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(room)} className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(room.roomNumber)} className="p-2 bg-red-100 rounded hover:bg-red-200">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-xl relative">
            <button onClick={resetForm} className="absolute top-3 right-4 text-3xl font-light text-gray-400 hover:text-gray-600">&times;</button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              {editingRoom ? "Edit Room" : "Create Room"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Room Number</label>
                  <input
                    type="text"
                    required
                    value={formData.roomNumber}
                    onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">AC Type</label>
                  <select
                    value={formData.acType}
                    onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="ac">AC</option>
                    <option value="non-ac">Non-AC</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Occupied</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.occupied}
                    onChange={(e) => setFormData({ ...formData, occupied: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Rent</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.rent}
                    onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Photo URL</label>
                  <input
                    type="text"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">Facilities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                    {facilityOptions.map((facility) => (
                      <label key={facility} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.facilities.includes(facility)}
                          onChange={() => handleFacilityChange(facility)}
                          className="mr-2"
                        />
                        {facility}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 text-right mt-4">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    {editingRoom ? "Update Room" : "Create Room"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Trash2, Plus } from "lucide-react";
import axios from "axios";

const facilityOptions = ["Wi-Fi", "Study Table", "Geyser", "Laundry", "AC", "Cooler"];
const ITEMS_PER_PAGE = 6;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:5001/rooms");
    setRooms(res.data.data || []);
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
        await axios.put(`http://localhost:5001/rooms/${editingRoom._id}`, newRoom);
        alert("Room updated");
      } else {
        await axios.post("http://localhost:5001/rooms", newRoom);
        alert("Room created");
      }
      fetchRooms();
      resetForm();
    } catch (err) {
      if (err?.response?.data?.code === 11000) {
        alert("Room with this number already exists!");
      } else {
        alert("Failed to save room");
      }
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this room?")) {
      await axios.delete(`http://localhost:5001/rooms/${id}`);
      fetchRooms();
    }
  };

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      type: "single",
      acType: "ac",
      rent: "",
      photo: "",
      facilities: []
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  // Pagination logic
  const totalPages = Math.ceil(rooms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRooms = rooms.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <AdminLayout title="Room Management">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Room
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 min-w-[768px]">
          {currentRooms.map((room) => (
            <div
              key={room._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <img src={room.photo} alt="Room" className="h-28 w-full object-cover rounded mb-2" />
              <h2 className="text-sm font-semibold truncate">Room #{room.roomNumber}</h2>
              <p className="text-xs">Type: {room.type}</p>
              <p className="text-xs">AC: {room.acType}</p>
              <p className="text-xs">Capacity: {room.capacity}</p>
              <p className="text-xs">Rent: ₹{room.rent}</p>
              <p className={`text-xs font-medium ${room.occupied > 0 ? "text-red-600" : "text-green-600"}`}>
                {room.occupied > 0 ? `Occupied (${room.occupied})` : "Available"}
              </p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setFormData(room);
                    setShowForm(true);
                  }}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start px-2 pt-10 pb-6 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={resetForm}
              className="absolute top-2 right-4 text-2xl text-gray-500"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-center mb-6 text-blue-700">
              {editingRoom ? "Edit Room" : "Create Room"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Room Number</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  required
                />
              </div>

           

              <div>
                <label className="block mb-1">AC Type</label>
                <select
                  className="w-full border px-3 py-2 rounded"
                  value={formData.acType}
                  onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                >
                  <option value="ac">AC</option>
                  <option value="non-ac">Non-AC</option>
                </select>
              </div>

             

              <div>
                <label className="block mb-1">Rent</label>
                <input
                  type="number"
                  value={formData.rent}
                  onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Photo URL</label>
                <input
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1">Facilities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {facilityOptions.map((facility) => (
                    <label key={facility} className="flex items-center">
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

              <div className="text-right">
                <button
                  onClick={handleFormSubmit}
                  className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  {editingRoom ? "Update Room" : "Create Room"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

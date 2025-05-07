import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Trash2, Pencil, Plus } from "lucide-react";
import axios from "axios";
import ImageUploader from "../../components/ImageUploader";

const facilityOptions = [
  "Wi-Fi",
  "Study Table",
  "Geyser",
  "Laundry",
  "AC",
  "Cooler",
];
const ITEMS_PER_PAGE = 6;

export default function RoomManagementPage() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    type: "single",
    acType: "ac",
    rent: "",
    photo: "",
    facilities: [],
  });
  const [editingRoom, setEditingRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAC, setFilterAC] = useState("all");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:5001/rooms");
    setRooms( res.data.data || []);
  };

  const getCapacityByType = (type) => {
    if (type === "single") return 1;
    if (type === "double") return 2;
    if (type === "triple") return 3;
    return 1;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      ...formData,
      type: formData.type.toLowerCase(),
      acType: formData.acType.toLowerCase(),
      rent: parseInt(formData.rent),
      facilities: formData.facilities || [],
      photo: formData.photo || "",
      capacity: getCapacityByType(formData.type),
      occupied: editingRoom ? editingRoom.occupied : 0,
    };

    try {
      if (editingRoom) {
        await axios.put(
          `http://localhost:5001/rooms/${editingRoom._id}`,
          newRoom
        );
        alert("Room updated");
      } else {
        await axios.post("http://localhost:5001/rooms", newRoom);
        alert("Room created");
      }
      fetchRooms();
      resetForm();
    } catch (err) {
      if (
        err?.response?.data?.code === 11000 ||
        err?.response?.data?.message?.includes("exists")
      ) {
        alert("Room with this number already exists!");
      } else {
        alert(
          "Failed to save room: " +
            (err?.response?.data?.message || "Unknown error")
        );
        console.error("POST error", err);
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
      facilities: [],
    });
    setEditingRoom(null);
    setShowForm(false);
  };

  const handleFacilityChange = (facility) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const filteredRooms = rooms
    .filter((room) =>
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((room) => (filterAC === "all" ? true : room.acType === filterAC));

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRooms = filteredRooms.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <AdminLayout title="Room Management">
      <div className="p-4 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search Room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded"
          />
          <select
            value={filterAC}
            onChange={(e) => setFilterAC(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="ac">AC</option>
            <option value="non-ac">Non-AC</option>
          </select>
        </div>
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
      {currentRooms.length == 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-10 text-gray-500">
          <p className="text-lg font-medium">No rooms found</p>
          <p className="text-sm">Create a new room or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
          {currentRooms.map((room) => (
            <div
              key={room._id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
            >
              <img
                src={room.photo}
                alt="Room"
                className="h-28 w-full object-cover rounded mb-2"
              />
              <h2 className="text-sm font-semibold truncate">
                Room #{room.roomNumber}
              </h2>
              <p className="text-xs">Type: {room.type}</p>
              <p className="text-xs">AC: {room.acType}</p>
              <p className="text-xs">Total Capacity: {room.capacity}</p>
              <p className="text-xs">Occupied: {room.occupied}</p>
              <p
                className={`text-xs font-medium ${
                  room.capacity - room.occupied > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {room.capacity - room.occupied > 0
                  ? `Available (${room.capacity - room.occupied})`
                  : "Fully Occupied"}
              </p>
              <p className="text-xs">Rent: ₹{room.rent}</p>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => {
                    setEditingRoom(room);
                    setFormData({
                      roomNumber: room.roomNumber,
                      type: room.type,
                      acType: room.acType,
                      rent: room.rent,
                      photo: room.photo,
                      facilities: room.facilities || [],
                    });
                    setShowForm(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

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
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Room Number"
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="triple">Triple</option>
              </select>
              <select
                value={formData.acType}
                onChange={(e) =>
                  setFormData({ ...formData, acType: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="ac">AC</option>
                <option value="non-ac">Non-AC</option>
              </select>
              <input
                type="number"
                placeholder="Rent"
                value={formData.rent}
                onChange={(e) =>
                  setFormData({ ...formData, rent: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />

              <ImageUploader
                value={formData.photo}
                onUpload={(url) => setFormData({ ...formData, photo: url })}
              />
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
                  type="submit"
                  className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  {editingRoom ? "Update Room" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

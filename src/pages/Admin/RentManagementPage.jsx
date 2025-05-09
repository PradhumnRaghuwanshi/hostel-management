import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Trash2, Plus, FileText, Download, Pencil } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { HostelData } from "../../Context";
import UpdateRentModal from "../../components/UpdateRentModal";

const ITEMS_PER_PAGE = 6;

export default function RentManagementPage() {
  useEffect(() => {
    fetchRoomsWithRents();
  }, []);
  const { fetchRoomsWithRents, roomRentData, setRoomRentData } = useContext(HostelData);
  const [showModal, setShowModal] = useState(false);
  const [selectedRentId, setSelectedRentId] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleOpenModal = (room, rentId) => {
    setSelectedRoom(room);
    setSelectedRentId(rentId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleRentUpdate = () => {
    // Refresh the data or make any changes after the rent is updated
    console.log('Rent updated');
  };

  const [rents, setRents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [formData, setFormData] = useState({
    roomNumber: "",
    amountPaid: "",
    amountDue: "",
    datePaid: "",
    status: "unpaid",
    electricity: {
      unitsConsumed: 0,
      electricityAmountDue: 0,
      electricityStatus: "unpaid",
    },
  });
  const [editingRent, setEditingRent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchRents();
    getRoomData();
  }, []);

  const [roomDatam, setRoomData] = useState([]);
  const fetchRents = async () => {
    const res = await axios.get("http://localhost:5001/rents");
    setRents(res.data.data || []);
    console.log(res.data.data);
  };

  const getRoomData = () => {
    axios
      .get("http://localhost:5001/rooms")
      .then((res) => setRoomData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const roomRes = await axios.get("http://localhost:5001/rooms");
      const matchedRoom = roomRes.data.data.find(
        (r) => r.roomNumber.toString() === formData.roomNumber.toString()
      );
      if (!matchedRoom) return toast.error("Room not found");

      const amountPaid = parseFloat(formData.amountPaid);
      const amountDue = parseFloat(formData.amountDue);
      const rentPayments = [
        {
          amountPaid,
          amountDue,
          datePaid: formData.datePaid,
          status: formData.status,
        },
      ];
      const totalRentPaid = amountPaid;
      const totalRentDue = amountPaid + amountDue;
      const rentStatus =
        amountPaid === 0
          ? "unpaid"
          : amountPaid >= totalRentDue
          ? "paid"
          : "partial";

      const payload = {
        room: matchedRoom._id,
        rentPayments,
        totalRentPaid,
        totalRentDue,
        rentStatus,
        electricity: {
          unitsConsumed: parseFloat(formData.electricity.unitsConsumed),
          electricityAmountDue: parseFloat(
            formData.electricity.electricityAmountDue
          ),
          electricityStatus: formData.electricity.electricityStatus,
        },
      };

      await axios.post("http://localhost:5001/rents", payload);
      toast.success(editingRent ? "Rent updated" : "Rent added");
      fetchRents();
      resetForm();
    } catch (err) {
      toast.error("Error saving rent record");
    }
  };

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      amountPaid: "",
      amountDue: "",
      datePaid: "",
      status: "unpaid",
      electricity: {
        unitsConsumed: 0,
        electricityAmountDue: 0,
        electricityStatus: "unpaid",
      },
    });
    setEditingRent(null);
    setShowForm(false);
  };

  const handleEdit = (rent) => {
    setFormData({
      roomNumber: rent.room?.roomNumber || "",
      amountPaid: rent.totalRentPaid || "",
      amountDue: rent.totalRentDue - rent.totalRentPaid || "",
      datePaid: rent.rentPayments?.[0]?.datePaid?.slice(0, 10) || "",
      status: rent.rentPayments?.[0]?.status || "unpaid",
      electricity: {
        unitsConsumed: rent.electricity?.unitsConsumed || 0,
        electricityAmountDue: rent.electricity?.electricityAmountDue || 0,
        electricityStatus: rent.electricity?.electricityStatus || "unpaid",
      },
    });
    setEditingRent(rent);
    setShowForm(true);
  };

  const handleDelete = async (roomId) => {
    if (confirm("Delete this rent record?")) {
      await axios.delete(`http://localhost:5001/rents/${roomId}`);
      fetchRents();
      toast.success("Deleted");
    }
  };

  const handlePDFExport = () => {
    const doc = new jsPDF();
    doc.text("Rent Report", 14, 10);
    const tableData = rents.map(
      ({ room, totalRentDue, totalRentPaid, rentStatus }) => [
        room?.roomNumber || room,
        totalRentDue,
        totalRentPaid,
        rentStatus,
      ]
    );
    doc.autoTable({
      head: [["Room", "Rent Due", "Rent Paid", "Status"]],
      body: tableData,
    });
    doc.save("RentReport.pdf");
  };

  const handleExport = () => {
    const exportData = rents.map(
      ({ room, totalRentDue, totalRentPaid, rentStatus }) => ({
        Room: room?.roomNumber || room,
        "Total Rent Due": totalRentDue,
        "Total Rent Paid": totalRentPaid,
        Status: rentStatus,
      })
    );
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rents");
    XLSX.writeFile(workbook, "RentData.xlsx");
  };

  return (
    <AdminLayout title="Rent Management">
      <ToastContainer />
      <div className="p-4 space-y-6">
        <div className="flex justify-between flex-wrap gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Room"
              className="border px-3 py-2 rounded w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border px-3 py-2 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="partial">Partial</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-1"
            >
              <Download size={16} /> Excel
            </button>
            <button
              onClick={handlePDFExport}
              className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1"
            >
              <FileText size={16} /> PDF
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <Plus size={16} /> Add Rent
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {JSON.stringify(roomRentData)}
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Room Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rent</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Rent Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Last Payment</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Electricity Bill</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {roomRentData.map((room) => (
              <tr key={room._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{room.roomNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-700">₹{room.rent}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {room.rentDetails.length > 0 ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Due</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {room.rentDetails.length > 0 ? (
                    new Date(room.rentDetails[room.rentDetails.length - 1].date).toLocaleDateString()
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {room.electricityBill.length > 0 ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleOpenModal(room, 'rent-id-1')}
                  >
                    Update Rent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
        <UpdateRentModal
          room={selectedRoom}
          rentId={selectedRentId}
          onClose={handleCloseModal}
          onUpdate={handleRentUpdate}
        />
      )}
        </div>
        {/* <div className="flex justify-center gap-2 mt-4">
          {Array.from(
            { length: Math.ceil(filtered.length / ITEMS_PER_PAGE) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div> */}
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
                {editingRent ? "Edit Rent" : "Create Rent"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  placeholder="Room Number"
                  value={formData.roomNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, roomNumber: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  placeholder="Amount Paid"
                  value={formData.amountPaid}
                  onChange={(e) =>
                    setFormData({ ...formData, amountPaid: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  placeholder="Amount Due"
                  value={formData.amountDue}
                  onChange={(e) =>
                    setFormData({ ...formData, amountDue: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="date"
                  value={formData.datePaid}
                  onChange={(e) =>
                    setFormData({ ...formData, datePaid: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                </select>
                <input
                  placeholder="Electricity Units"
                  value={formData.electricity.unitsConsumed}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      electricity: {
                        ...formData.electricity,
                        unitsConsumed: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  placeholder="Electricity Amount Due"
                  value={formData.electricity.electricityAmountDue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      electricity: {
                        ...formData.electricity,
                        electricityAmountDue: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                />
                <select
                  value={formData.electricity.electricityStatus}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      electricity: {
                        ...formData.electricity,
                        electricityStatus: e.target.value,
                      },
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

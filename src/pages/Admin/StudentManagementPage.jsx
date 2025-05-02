// StudentManagementPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

export default function StudentManagementPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
    roomAllocated: "",
    feeStatus: "unpaid",
    phoneNumber: "",
    detailPhotos: {
      rentAgreement: "",
      aadharPhotos: "",
      passportPhoto: ""
    }
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchRooms();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5001/users");
    setStudents(res.data.data || []);
  };

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:5001/rooms");
    setRooms(res.data.data || []);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "male",
      roomAllocated: "",
      feeStatus: "unpaid",
      phoneNumber: "",
      detailPhotos: {
        rentAgreement: "",
        aadharPhotos: "",
        passportPhoto: ""
      }
    });
    setEditingStudent(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      phoneNumber: Number(formData.phoneNumber),
      detailPhotos: {
        passportPhoto: formData.detailPhotos.passportPhoto,
        rentAgreement: formData.detailPhotos.rentAgreement
          ? formData.detailPhotos.rentAgreement.split(",").map((x) => x.trim())
          : [],
        aadharPhotos: formData.detailPhotos.aadharPhotos
          ? formData.detailPhotos.aadharPhotos.split(",").map((x) => x.trim())
          : []
      }
    };

    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5001/users/${editingStudent._id}`, dataToSend);
        alert("Student updated successfully!");
      } else {
        await axios.post("http://localhost:5001/users", dataToSend);
        alert("Student created successfully!");
      }
      fetchStudents();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error saving student!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete student?")) {
      await axios.delete(`http://localhost:5001/users/${id}`);
      fetchStudents();
    }
  };

  return (
    <AdminLayout title="Student Management">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        {students.map((s) => (
          <div key={s._id} className="bg-white shadow border rounded-xl p-4 relative flex flex-col h-fit">
            <div className="flex justify-between">
              <div>
                <h2 className="text-md font-semibold">{s.name}</h2>
                <p className="text-xs">Email: {s.email}</p>
                <p className="text-xs">Gender: {s.gender}</p>
                <p className="text-xs">Phone: {s.phoneNumber}</p>
                <p className="text-xs">Fee: {s.feeStatus}</p>
                <p className="text-xs">Room: {s.roomAllocated?.roomNumber || "Not assigned"}</p>
              </div>
              <div className="flex flex-col gap-1 items-end ml-2">
                {s.detailPhotos.passportPhoto && (
                  <img
                    src={s.detailPhotos.passportPhoto}
                    alt="Passport"
                    className="w-14 h-14 object-cover rounded cursor-pointer"
                    onClick={() => window.open(s.detailPhotos.passportPhoto, "_blank")}
                  />
                )}
                {(s.detailPhotos.rentAgreement || []).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Rent"
                    className="w-14 h-14 object-cover rounded cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                  />
                ))}
                {(s.detailPhotos.aadharPhotos || []).map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Aadhar"
                    className="w-14 h-14 object-cover rounded cursor-pointer"
                    onClick={() => window.open(url, "_blank")}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between pt-3">
              <button
                onClick={() => {
                  setEditingStudent(s);
                  setFormData({
                    ...s,
                    detailPhotos: {
                      passportPhoto: s.detailPhotos?.passportPhoto || "",
                      rentAgreement: (s.detailPhotos?.rentAgreement || []).join(", "),
                      aadharPhotos: (s.detailPhotos?.aadharPhotos || []).join(", ")
                    }
                  });
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start px-4 py-10 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
            <button onClick={resetForm} className="absolute top-2 right-4 text-2xl text-gray-500">
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {["name", "email", "password", "phoneNumber"].map((field) => (
                <input
                  key={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border px-3 py-2 rounded w-full"
                  value={formData[field]}
                  type={field === "password" ? "password" : "text"}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                />
              ))}

              <select
                className="border px-3 py-2 rounded"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                className="border px-3 py-2 rounded"
                value={formData.feeStatus}
                onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value })}
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>

              <select
                className="border px-3 py-2 rounded"
                value={formData.roomAllocated}
                onChange={(e) => setFormData({ ...formData, roomAllocated: e.target.value })}
              >
                <option value="">-- Select Room --</option>
                {rooms.map((r) => (
                  <option key={r._id} value={r._id}>
                    Room #{r.roomNumber}
                  </option>
                ))}
              </select>

              <input
                placeholder="Passport Photo URL"
                className="border px-3 py-2 rounded"
                value={formData.detailPhotos.passportPhoto}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detailPhotos: { ...formData.detailPhotos, passportPhoto: e.target.value }
                  })
                }
              />
              <input
                placeholder="Rent Agreement URLs (comma separated)"
                className="border px-3 py-2 rounded"
                value={formData.detailPhotos.rentAgreement}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detailPhotos: { ...formData.detailPhotos, rentAgreement: e.target.value }
                  })
                }
              />
              <input
                placeholder="Aadhar Photo URLs (comma separated)"
                className="border px-3 py-2 rounded"
                value={formData.detailPhotos.aadharPhotos}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    detailPhotos: { ...formData.detailPhotos, aadharPhotos: e.target.value }
                  })
                }
              />

              <div className="text-right">
                <button
                  onClick={handleFormSubmit}
                  className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
                >
                  {editingStudent ? "Update Student" : "Add Student"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

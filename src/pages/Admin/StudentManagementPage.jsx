// StudentManagementPage.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { User, Eye, Trash2, FileText } from "lucide-react";

const initialStudents = [
  {
    id: "S101",
    name: "Aman Sharma",
    room: 101,
    history: ["Rent Paid - April", "Complaint - AC Issue"],
  },
  {
    id: "S102",
    name: "Priya Mehta",
    room: 102,
    history: ["Rent Paid - April"],
  },
];

export default function StudentManagementPage() {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <AdminLayout title="Student Management">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 pb-10">
        {students.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">{s.name}</h2>
            </div>
            <p className="text-sm text-gray-500 mb-1">ID: {s.id}</p>
            <p className="text-sm text-gray-500 mb-1">Room: {s.room}</p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedStudent(s)}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg shadow hover:bg-blue-700"
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="p-2 bg-red-100 rounded hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {!!selectedStudent && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto w-full h-full px-6 py-10 animate-fadeIn">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">
                {selectedStudent.name}'s Profile
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-3xl font-light"
                onClick={() => setSelectedStudent(null)}
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-gray-700 text-lg">
              <p><strong className="text-gray-900">Student ID:</strong> {selectedStudent.id}</p>
              <p><strong className="text-gray-900">Room Number:</strong> {selectedStudent.room}</p>
              <div>
                <strong className="text-gray-900">History:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {selectedStudent.history.map((item, idx) => (
                    <li key={idx}>{item}</li>
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

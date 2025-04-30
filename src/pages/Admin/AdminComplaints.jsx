// src/pages/Admin/AdminComplaints.jsx
import React, { useState, useMemo } from "react";
import AdminSidebar from "./AdminSidebar"; // Make sure this import exists and is correct!

const initialComplaints = [
  { id: 1, name: "Amit", subject: "Water Issue", message: "No water in bathroom.", date: "2024-04-21", status: "Pending" },
  { id: 2, name: "Sneha", subject: "AC Problem", message: "AC not working in room.", date: "2024-04-19", status: "Resolved" },
  { id: 3, name: "Rohan", subject: "Mess Quality", message: "Food is not fresh.", date: "2024-04-18", status: "Pending" },
];

const statuses = ["All", "Pending", "Resolved"];

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredComplaints = useMemo(
    () =>
      complaints.filter(
        (c) =>
          (search === "" ||
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.subject.toLowerCase().includes(search.toLowerCase())) &&
          (filterStatus === "All" || c.status === filterStatus)
      ),
    [complaints, search, filterStatus]
  );

  const handleResolve = (id) => {
    setComplaints(
      complaints.map((c) =>
        c.id === id ? { ...c, status: "Resolved" } : c
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Complaints</h2>
        {/* Search & Filter */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <input
            placeholder="Search by student or subject"
            className="border px-3 py-2 rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Student</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="p-3">{c.date}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.subject}</td>
                  <td className="p-3">{c.message}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      c.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {c.status !== "Resolved" ? (
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                        onClick={() => handleResolve(c.id)}
                      >
                        Mark as Resolved
                      </button>
                    ) : (
                      <span className="text-gray-400">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredComplaints.length === 0 && (
            <div className="p-4 text-gray-500 text-center">
              No complaints found.
            </div>
          )}
        </div>
        <div className="mt-3 text-sm text-gray-500">
          * Demo me data memory me hai, backend connect karoge toh fetch/update yahin lagana hai.
        </div>
      </main>
    </div>
  );
};

export default AdminComplaints;

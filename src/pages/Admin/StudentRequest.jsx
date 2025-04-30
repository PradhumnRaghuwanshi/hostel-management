import React, { useState, useMemo } from "react";
import AdminSidebar from "./AdminSidebar";

const initialRequests = [
  { id: "S104", name: "Manish Kumar", reason: "Room Change", date: "2024-04-22", status: "Pending" },
  { id: "S107", name: "Priya Jain", reason: "New Admission", date: "2024-04-20", status: "Pending" },
  { id: "S120", name: "Suresh Gupta", reason: "Room Repair", date: "2024-04-18", status: "Approved" },
];

const reasons = ["All", "Room Change", "New Admission", "Room Repair"];
const statuses = ["All", "Pending", "Approved", "Rejected"];

const StudentRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filterReason, setFilterReason] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter/Search Logic
  const filteredRequests = useMemo(
    () =>
      requests.filter(
        (r) =>
          (search === "" || r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterReason === "All" || r.reason === filterReason) &&
          (filterStatus === "All" || r.status === filterStatus)
      ),
    [requests, search, filterReason, filterStatus]
  );

  const handleAction = (id, action) => {
    setRequests(
      requests.map((r) =>
        r.id === id ? { ...r, status: action } : r
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Student Requests</h2>
        {/* Search & Filters */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <input
            placeholder="Search by name or ID"
            className="border px-3 py-2 rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="border px-3 py-2 rounded" value={filterReason} onChange={e => setFilterReason(e.target.value)}>
            {reasons.map(r => <option key={r}>{r}</option>)}
          </select>
          <select className="border px-3 py-2 rounded" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Student ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Request Reason</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b">
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{req.name}</td>
                  <td className="p-3">{req.reason}</td>
                  <td className="p-3">{req.date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                          onClick={() => handleAction(req.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                          onClick={() => handleAction(req.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status !== "Pending" && <span className="text-gray-400">Actioned</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRequests.length === 0 && (
            <div className="p-4 text-gray-500 text-center">No requests found.</div>
          )}
        </div>
        <div className="mt-3 text-sm text-gray-500">
          * Demo me data memory me hai, real API lagani ho toh yahin pe fetch/update kar sakte ho.
        </div>
      </main>
    </div>
  );
};

export default StudentRequests;

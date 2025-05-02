import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminComplaintPage() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("https://hostel-management-backend-qyvz.onrender.com/complaint");
      setComplaints(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (id) => {
    try {
      const resolvedAt = new Date();

      await axios.put(`https://hostel-management-backend-qyvz.onrender.com/complaint/${id}`, {
        status: "resolved",
        resolvedAt,
      });

      // Update UI
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: "resolved", resolvedAt: resolvedAt.toISOString() } : c
        )
      );

      setSelectedComplaint(null);
    } catch (err) {
      console.error("Resolve error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await axios.delete(`https://hostel-management-backend-qyvz.onrender.com/complaint/${id}`);
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const grouped = complaints.reduce((acc, c) => {
    const status = c.status || "pending";
    acc[status] = acc[status] || [];
    acc[status].push(c);
    return acc;
  }, {});

  return (
    <AdminLayout title="Manage Complaints">
      <div className="p-6 space-y-12">
        {["pending", "resolved"].map((status) => (
          <div key={status}>
            <h2 className="text-xl font-bold capitalize mb-4">{status} Complaints</h2>
            <div className="grid gap-4">
              {(grouped[status] || []).map((c) => (
                <div key={c._id} className="border p-4 rounded shadow bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-blue-800">{c.title || "Untitled"}</h3>
                    <span className="text-sm text-gray-500">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1">{c.description}</p>
                  <p className="text-sm text-gray-600">
                    Student: {c.studentName || "N/A"} ({c.student || "no-id"}) | Room: {c.roomNumber || "N/A"}
                  </p>
                  {c.resolvedAt && (
                    <p className="text-xs text-green-600 mt-1">
                      Resolved At: {new Date(c.resolvedAt).toLocaleString()}
                    </p>
                  )}
                  <div className="mt-3 flex gap-3">
                    {status === "pending" && (
                      <button
                        onClick={() => setSelectedComplaint(c)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                      >
                        Mark Resolved
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {(grouped[status] || []).length === 0 && (
                <p className="text-gray-400">No {status} complaints</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Resolve Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Resolve Complaint</h3>
            <p className="mb-3"><strong>{selectedComplaint.title}</strong></p>
            <p className="mb-4">{selectedComplaint.description}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolve(selectedComplaint._id)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Confirm Resolve
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

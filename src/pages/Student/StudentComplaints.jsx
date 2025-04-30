import React, { useState } from "react";
import { ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const initialComplaints = [
  {
    id: 1,
    subject: "No water in bathroom",
    description: "There is no water supply since yesterday night.",
    date: "2024-04-24",
    status: "Pending",
  },
  {
    id: 2,
    subject: "AC not working",
    description: "The AC in my room is not cooling at all.",
    date: "2024-04-21",
    status: "Resolved",
  },
];

const statusBadge = (status) => {
  if (status === "Pending")
    return (
      <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-700/20 text-yellow-700 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-bold">
        <ExclamationTriangleIcon className="h-4 w-4" /> Pending
      </span>
    );
  if (status === "Resolved")
    return (
      <span className="flex items-center gap-1 bg-green-100 dark:bg-green-700/20 text-green-700 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold">
        <CheckCircleIcon className="h-4 w-4" /> Resolved
      </span>
    );
  return (
    <span className="flex items-center gap-1 bg-red-100 dark:bg-red-700/20 text-red-600 dark:text-red-200 px-2 py-1 rounded-full text-xs font-bold">
      <XCircleIcon className="h-4 w-4" /> Rejected
    </span>
  );
};

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ subject: "", description: "" });

  // Add new complaint handler (demo)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.description.trim()) return;
    setComplaints([
      {
        id: complaints.length + 1,
        subject: form.subject,
        description: form.description,
        date: new Date().toISOString().slice(0, 10),
        status: "Pending",
      },
      ...complaints,
    ]);
    setShowForm(false);
    setForm({ subject: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-10 px-2">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">My Complaints</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Raise hostel issues, track complaint status and history.</p>
        
        {/* New Complaint Button */}
        <button
          className="mb-7 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold shadow"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <PlusCircleIcon className="h-5 w-5" />
          New Complaint
        </button>

        {/* Complaint Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 bg-blue-50 dark:bg-gray-800 rounded-xl p-5">
            <div className="mb-3">
              <label className="block mb-1 text-gray-800 dark:text-gray-200 font-semibold">Subject</label>
              <input
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                value={form.subject}
                maxLength={80}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is the issue?"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-gray-800 dark:text-gray-200 font-semibold">Description</label>
              <textarea
                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                value={form.description}
                maxLength={300}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the problem in detail"
                rows={3}
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded shadow">
              Submit
            </button>
          </form>
        )}

        {/* Complaints List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white dark:bg-gray-900 rounded-xl shadow">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-3 text-gray-600 dark:text-gray-300">{c.date}</td>
                  <td className="p-3 font-bold text-blue-800 dark:text-blue-300">{c.subject}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-100">{c.description}</td>
                  <td className="p-3">{statusBadge(c.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {complaints.length === 0 && (
          <div className="p-5 text-gray-500 dark:text-gray-400 text-center">
            No complaints yet.
          </div>
        )}
      </div>
    </div>
  );
}

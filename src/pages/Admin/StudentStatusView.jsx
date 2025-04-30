// src/pages/Admin/StudentStatusView.jsx
import React, { useState, useMemo } from "react";

const initialStudents = [
  {
    id: "S101",
    name: "Anuj Sharma",
    year: "2nd",
    branch: "CSE",
    roomNo: "A-201",
    feeStatus: "Pending",
    complaints: 1,
  },
  {
    id: "S102",
    name: "Pooja Verma",
    year: "1st",
    branch: "ECE",
    roomNo: "A-105",
    feeStatus: "Paid",
    complaints: 0,
  },
  {
    id: "S103",
    name: "Rahul Meena",
    year: "3rd",
    branch: "ME",
    roomNo: "",
    feeStatus: "Pending",
    complaints: 2,
  },
];

const years = ["All", "1st", "2nd", "3rd", "4th"];
const feeStatuses = ["All", "Paid", "Pending"];

const StudentStatusView = () => {
  const [students] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [filterFee, setFilterFee] = useState("All");

  // Filter/Search Logic
  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          (search === "" ||
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterYear === "All" || s.year === filterYear) &&
          (filterFee === "All" || s.feeStatus === filterFee)
      ),
    [students, search, filterYear, filterFee]
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Student Status Overview</h2>
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          placeholder="Search by name or ID"
          className="border px-3 py-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border px-3 py-2 rounded" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
        <select className="border px-3 py-2 rounded" value={filterFee} onChange={e => setFilterFee(e.target.value)}>
          {feeStatuses.map(f => <option key={f}>{f}</option>)}
        </select>
      </div>
      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Year</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Room No.</th>
              <th className="p-3">Fee Status</th>
              <th className="p-3">Complaints</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.year}</td>
                <td className="p-3">{s.branch}</td>
                <td className="p-3">{s.roomNo || <span className="text-gray-400">Not Allocated</span>}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                      s.feeStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {s.feeStatus}
                  </span>
                </td>
                <td className="p-3">
                  {s.complaints > 0 ? (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                      {s.complaints} Pending
                    </span>
                  ) : (
                    <span className="text-gray-500">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && (
          <div className="p-4 text-gray-500 text-center">No students found.</div>
        )}
      </div>
      <div className="mt-3 text-sm text-gray-500">
        * Data demo ke liye static hai, API connect karoge toh yahin fetch lagana hai.
      </div>
    </div>
  );
};

export default StudentStatusView;

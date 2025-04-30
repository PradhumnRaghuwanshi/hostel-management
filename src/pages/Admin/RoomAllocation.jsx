import React, { useState, useMemo } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const allRooms = [
  "A-101", "A-102", "A-201", "B-101", "B-202", "C-301"
];

const initialStudents = [
  { id: "S101", name: "Anuj Sharma", year: "2nd", branch: "CSE", roomNo: "A-101", status: "Allocated" },
  { id: "S102", name: "Pooja Verma", year: "1st", branch: "ECE", roomNo: "", status: "Not Allocated" },
  { id: "S103", name: "Rahul Meena", year: "3rd", branch: "ME", roomNo: "B-101", status: "Allocated" },
];

const years = ["All", "1st", "2nd", "3rd", "4th"];
const statuses = ["All", "Allocated", "Not Allocated"];

function fakeApiDelay(fn) {
  return new Promise((resolve) => setTimeout(() => resolve(fn()), 800));
}

const RoomAllocation = () => {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [modal, setModal] = useState({ open: false, student: null, action: null, room: "" });

  // SEARCH/FILTER LOGIC
  const filteredStudents = useMemo(() => students.filter(s =>
    (search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())) &&
    (filterYear === "All" || s.year === filterYear) &&
    (filterStatus === "All" || s.status === filterStatus)
  ), [students, search, filterYear, filterStatus]);

  // ALLOCATE/DEALLOCATE HANDLERS
  const handleModal = (student, action) => {
    setModal({
      open: true,
      student,
      action,
      room: student.roomNo || allRooms[0]
    });
  };

  const confirmAction = async () => {
    setModal((m) => ({ ...m, open: false }));
    await fakeApiDelay(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === modal.student.id
            ? modal.action === "allocate"
              ? { ...s, roomNo: modal.room, status: "Allocated" }
              : { ...s, roomNo: "", status: "Not Allocated" }
            : s
        )
      );
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Room Allocation (Admin)</h2>
      {/* Search & Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          placeholder="Search by name or ID"
          className="border px-3 py-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border px-3 py-2 rounded" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          {years.map(y => <option key={y}>{y}</option>)}
        </select>
        <select className="border px-3 py-2 rounded" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Student ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Year</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Room No.</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.year}</td>
                <td className="p-3">{s.branch}</td>
                <td className="p-3">
                  {s.status === "Allocated" ? s.roomNo : "-"}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                      s.status === "Allocated"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  {s.status === "Allocated" ? (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      onClick={() => handleModal(s, "deallocate")}
                    >
                      Deallocate
                    </button>
                  ) : (
                    <>
                      <select
                        className="border px-2 py-1 rounded text-sm"
                        value={modal.student?.id === s.id ? modal.room : allRooms[0]}
                        onChange={e => {
                          if (modal.student?.id === s.id) setModal(m => ({ ...m, room: e.target.value }));
                        }}
                        onClick={e => { // make sure modal has correct initial value if opened
                          if (modal.student?.id !== s.id) setModal(m => ({ ...m, room: allRooms[0] }));
                        }}
                        disabled={modal.student?.id !== s.id && modal.open}
                      >
                        {allRooms.map(roomNo => (
                          <option key={roomNo}>{roomNo}</option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        onClick={() => handleModal(s, "allocate")}
                      >
                        Allocate
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <Dialog open={modal.open} onClose={() => setModal(m => ({ ...m, open: false }))} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-8 max-w-md mx-auto shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
              <Dialog.Title className="font-bold text-lg">
                {modal.action === "allocate" ? "Allocate Room" : "Deallocate Room"}
              </Dialog.Title>
            </div>
            <Dialog.Description className="mb-5 text-gray-600">
              {modal.action === "allocate" ? (
                <>
                  Are you sure you want to allocate room <b>{modal.room}</b> to <b>{modal.student?.name}</b>?
                </>
              ) : (
                <>
                  Are you sure you want to deallocate room from <b>{modal.student?.name}</b>?
                </>
              )}
            </Dialog.Description>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setModal(m => ({ ...m, open: false }))}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded ${modal.action === "allocate"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                onClick={confirmAction}
              >
                {modal.action === "allocate" ? "Allocate" : "Deallocate"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <div className="mt-3 text-sm text-gray-500">
        * Data demo ke liye memory me hai, real API connect karoge toh fetch/update ke jagah API call lagao.
      </div>
    </div>
  );
};

export default RoomAllocation;


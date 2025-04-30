import React, { useState, useMemo } from "react";
import AdminSidebar from "./AdminSidebar";

const initialFees = [
  { id: 1, term: "Semester 1", amount: 20000, paid: 32, pending: 4 },
  { id: 2, term: "Semester 2", amount: 20000, paid: 25, pending: 11 },
  { id: 3, term: "Mess Fee", amount: 8000, paid: 33, pending: 3 },
];

const FeeManagement = () => {
  const [fees, setFees] = useState(initialFees);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  // Search logic
  const filteredFees = useMemo(
    () =>
      fees.filter(
        (f) =>
          search === "" ||
          f.term.toLowerCase().includes(search.toLowerCase())
      ),
    [fees, search]
  );

  const handleEdit = (id, amount) => {
    setEditingId(id);
    setNewAmount(amount);
  };

  const handleUpdate = (id) => {
    if (!newAmount || isNaN(newAmount)) return alert("Enter a valid amount!");
    setFees(
      fees.map((f) =>
        f.id === id ? { ...f, amount: Number(newAmount) } : f
      )
    );
    setEditingId(null);
    setNewAmount("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Fee Management</h2>
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search term (e.g. Mess, Sem)"
            className="border px-3 py-2 rounded"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Term</th>
                <th className="p-3">Amount (₹)</th>
                <th className="p-3">Paid Students</th>
                <th className="p-3">Pending Students</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="border-b">
                  <td className="p-3">{fee.term}</td>
                  <td className="p-3">
                    {editingId === fee.id ? (
                      <input
                        type="number"
                        className="border px-2 py-1 rounded w-28"
                        value={newAmount}
                        onChange={e => setNewAmount(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <span>₹{fee.amount.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                      {fee.paid}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">
                      {fee.pending}
                    </span>
                  </td>
                  <td className="p-3">
                    {editingId === fee.id ? (
                      <>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm mr-1"
                          onClick={() => handleUpdate(fee.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                        onClick={() => handleEdit(fee.id, fee.amount)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFees.length === 0 && (
            <div className="p-4 text-gray-500 text-center">
              No fee structure found.
            </div>
          )}
        </div>
        <div className="mt-3 text-sm text-gray-500">
          * Data memory me hai (demo), backend API lagani ho toh yahi par call karo.
        </div>
      </main>
    </div>
  );
};

export default FeeManagement;

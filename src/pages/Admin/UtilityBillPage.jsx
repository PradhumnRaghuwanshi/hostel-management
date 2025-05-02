import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5001";

export default function UtilityBillsPage() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    cleaner: "",
    maintainance: "",
    water: "",
    electricity: "",
  });

  // GET expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses`);
      console.log("Fetched:", res.data.data);
      setExpenses(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Submit new expense
  const handleSubmit = async () => {
    try {
      const payload = {
        cleaner: Number(form.cleaner),
        maintainance: Number(form.maintainance),
        water: Number(form.water),
        electricity: Number(form.electricity),
      };

      await axios.post(`${BASE_URL}/expenses`, payload);
      alert("Expense added successfully!");
      await fetchExpenses();
      setForm({ cleaner: "", maintainance: "", water: "", electricity: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err?.response?.data || err.message);
      alert("Failed to submit: " + (err?.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await axios.delete(`${BASE_URL}/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Utility Bills</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto mb-10">
        <table className="w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Cleaner</th>
              <th className="p-3 text-left">Maintenance</th>
              <th className="p-3 text-left">Water</th>
              <th className="p-3 text-left">Electricity</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-3">₹{e.cleaner}</td>
                <td className="p-3">₹{e.maintainance}</td>
                <td className="p-3">₹{e.water}</td>
                <td className="p-3">₹{e.electricity}</td>
                <td className="p-3 font-bold">
                  ₹{e.cleaner + e.maintainance + e.water + e.electricity}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No expenses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal - DIV Based */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md relative">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Expense</h2>

            <div className="space-y-4">
              {["cleaner", "maintainance", "water", "electricity"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="number"
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                </div>
              ))}
              <div className="text-right pt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

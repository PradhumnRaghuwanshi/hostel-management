// UtilityBillsPage.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";
import { Plus, Trash2, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

export default function UtilityBillsPage() {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    cleaner: "",
    maintainance: "",
    water: "",
    electricity: "",
    date: ""
  });
  const [editingBill, setEditingBill] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:5001/expenses");
      setBills(res.data.data || []);
    } catch (err) {
      console.error("fetchBills error", err);
    }
  };

  const resetForm = () => {
    setFormData({ cleaner: "", maintainance: "", water: "", electricity: "", date: "" });
    setEditingBill(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      cleaner: Number(formData.cleaner),
      maintainance: Number(formData.maintainance),
      water: Number(formData.water),
      electricity: Number(formData.electricity),
      date: formData.date || new Date()
    };
    try {
      if (editingBill) {
        await axios.put(`http://localhost:5001/expenses/${editingBill._id}`, payload);
        alert("Bill updated successfully!");
      } else {
        await axios.post("http://localhost:5001/expenses", payload);
        alert("Bill added successfully!");
      }
      fetchBills();
      resetForm();
    } catch (err) {
      console.error("handleFormSubmit error", err);
      alert("Failed to save bill!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this bill?")) {
      await axios.delete(`http://localhost:5001/expenses/${id}`);
      fetchBills();
    }
  };

  const getTotal = (bill) => bill.cleaner + bill.maintainance + bill.water + bill.electricity;

  const filteredBills = bills.filter((bill) => {
    const date = new Date(bill.date || bill.createdAt);
    const matchesMonth = monthFilter ? date.getMonth() + 1 === Number(monthFilter) : true;
    const matchesYear = yearFilter ? date.getFullYear() === Number(yearFilter) : true;
    return matchesMonth && matchesYear;
  });

  const totalAll = filteredBills.reduce((sum, bill) => sum + getTotal(bill), 0);

  const exportCSV = () => {
    const csvContent = [
      ["Date", "Cleaner", "Maintainance", "Water", "Electricity", "Total"],
      ...filteredBills.map((b) => [
        new Date(b.date || b.createdAt).toLocaleDateString(),
        b.cleaner,
        b.maintainance,
        b.water,
        b.electricity,
        getTotal(b)
      ])
    ].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "utility_bills.csv";
    link.click();
  };

  const uniqueYears = Array.from(new Set(bills.map((b) => new Date(b.date || b.createdAt).getFullYear())));

  const categorySums = filteredBills.reduce((acc, bill) => {
    acc.cleaner += bill.cleaner;
    acc.maintainance += bill.maintainance;
    acc.water += bill.water;
    acc.electricity += bill.electricity;
    return acc;
  }, { cleaner: 0, maintainance: 0, water: 0, electricity: 0 });

  const pieData = [
    { name: "Cleaner", value: categorySums.cleaner },
    { name: "Maintainance", value: categorySums.maintainance },
    { name: "Water", value: categorySums.water },
    { name: "Electricity", value: categorySums.electricity }
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <AdminLayout title="Utility Bills Management">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
        <div className="flex gap-2 items-center">
          <label>Month:</label>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>

          <label className="ml-4">Year:</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {uniqueYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-yellow-500 text-white px-3 py-2 rounded flex items-center gap-1">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Bill
          </button>
        </div>
      </div>

      <div className="text-right px-4 text-sm font-medium text-blue-700">
        Total Expenses: ₹{totalAll}
      </div>

      <ResponsiveContainer width="100%" height={300} className="px-4">
        <BarChart data={filteredBills.map((b) => ({
          name: new Date(b.date || b.createdAt).toLocaleDateString(),
          Cleaner: b.cleaner,
          Maintainance: b.maintainance,
          Water: b.water,
          Electricity: b.electricity
        }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cleaner" fill="#8884d8" />
          <Bar dataKey="Maintainance" fill="#82ca9d" />
          <Bar dataKey="Water" fill="#ffc658" />
          <Bar dataKey="Electricity" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300} className="px-4 my-6">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredBills.map((bill) => (
          <div key={bill._id} className="bg-white border shadow rounded-lg p-4">
            <p className="text-sm">📅 {new Date(bill.date || bill.createdAt).toLocaleDateString()}</p>
            <p className="text-sm">🧹 Cleaner: ₹{bill.cleaner}</p>
            <p className="text-sm">🔧 Maintainance: ₹{bill.maintainance}</p>
            <p className="text-sm">💧 Water: ₹{bill.water}</p>
            <p className="text-sm">⚡ Electricity: ₹{bill.electricity}</p>
            <p className="text-sm font-semibold mt-1">💰 Total: ₹{getTotal(bill)}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setEditingBill(bill);
                  setFormData({
                    cleaner: bill.cleaner,
                    maintainance: bill.maintainance,
                    water: bill.water,
                    electricity: bill.electricity,
                    date: bill.date ? bill.date.substring(0, 10) : ""
                  });
                  setShowForm(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bill._id)}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button onClick={resetForm} className="absolute top-2 right-4 text-2xl text-gray-500">
              &times;
            </button>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">
              {editingBill ? "Edit Bill" : "Add Bill"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border px-3 py-2 rounded w-full"
                required
              />
              {["cleaner", "maintainance", "water", "electricity"].map((key) => (
                <input
                  key={key}
                  type="number"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              ))}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                {editingBill ? "Update Bill" : "Add Bill"}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

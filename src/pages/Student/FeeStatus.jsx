import React from "react";
import { CheckCircle, XCircle, Download, Printer } from "lucide-react";

const feeHistory = [
  {
    term: "Semester 1",
    amount: 20000,
    status: "Paid",
    paidOn: "2024-02-12",
    receipt: "#FEE2024SEM1"
  },
  {
    term: "Semester 2",
    amount: 20000,
    status: "Pending",
    paidOn: null,
    receipt: null
  },
  {
    term: "Mess Fee",
    amount: 8000,
    status: "Paid",
    paidOn: "2024-01-10",
    receipt: "#FEE2024MESS"
  }
];

const getStatusBadge = (status) =>
  status === "Paid" ? (
    <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-bold">
      <CheckCircle className="h-4 w-4" /> Paid
    </span>
  ) : (
    <span className="flex items-center gap-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-bold">
      <XCircle className="h-4 w-4" /> Pending
    </span>
  );

export default function FeeStatus() {
  // Dummy print/download function
  const handleDownload = (receipt) => {
    alert(`Receipt download: ${receipt}`);
  };
  const handlePrint = (receipt) => {
    alert(`Receipt print: ${receipt}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-10 px-2">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#131a2b] rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-800 dark:text-blue-300">
          My Fee Status
        </h1>
        <p className="mb-8 text-gray-500 dark:text-gray-300">Check your hostel fee status, download receipts, and pay pending dues.</p>
        <div className="overflow-x-auto">
          <table className="w-full rounded-xl bg-white dark:bg-[#1a233a] shadow text-left text-base">
            <thead className="bg-gray-100 dark:bg-[#273052]">
              <tr>
                <th className="p-3 text-gray-700 dark:text-blue-200">Term</th>
                <th className="p-3 text-gray-700 dark:text-blue-200">Amount</th>
                <th className="p-3 text-gray-700 dark:text-blue-200">Status</th>
                <th className="p-3 text-gray-700 dark:text-blue-200">Paid On</th>
                <th className="p-3 text-gray-700 dark:text-blue-200">Receipt</th>
                <th className="p-3 text-gray-700 dark:text-blue-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeHistory.map((fee, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-[#222e50]"
                >
                  <td className="p-3 font-semibold text-gray-700 dark:text-white">{fee.term}</td>
                  <td className="p-3 font-bold text-blue-700 dark:text-blue-300">₹{fee.amount.toLocaleString()}</td>
                  <td className="p-3">{getStatusBadge(fee.status)}</td>
                  <td className="p-3">
                    {fee.paidOn ? (
                      <span className="text-green-700 dark:text-green-300">{fee.paidOn}</span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">--</span>
                    )}
                  </td>
                  <td className="p-3">
                    {fee.status === "Paid" ? (
                      <span className="text-xs text-gray-500 dark:text-gray-300">{fee.receipt}</span>
                    ) : (
                      <span className="text-xs text-gray-300 dark:text-gray-500">Not paid</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    {fee.status === "Paid" && (
                      <>
                        <button
                          className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                          onClick={() => handleDownload(fee.receipt)}
                          title="Download Receipt"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                          onClick={() => handlePrint(fee.receipt)}
                          title="Print Receipt"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {fee.status === "Pending" && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment history collapsible section (optional) */}
        <details className="mt-6 bg-blue-50 dark:bg-[#1a233a] rounded-xl p-4 cursor-pointer">
          <summary className="font-semibold text-blue-700 dark:text-blue-200">Show Payment History (Demo)</summary>
          <ul className="mt-3 text-gray-700 dark:text-gray-300 text-sm space-y-1">
            <li>12-Feb-2024: Semester 1 fee paid (₹20,000) - Receipt: #FEE2024SEM1</li>
            <li>10-Jan-2024: Mess Fee paid (₹8,000) - Receipt: #FEE2024MESS</li>
          </ul>
        </details>
      </div>
    </div>
  );
}

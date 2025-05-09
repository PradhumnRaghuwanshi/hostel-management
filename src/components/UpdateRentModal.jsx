import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRentModal = ({ room, rentId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    totalRent: room?.rent,
    rentPaid: 0,
    due: 0,
    electricityAmountDue: 0,
    electricityAmountPaid: 0,
    remarks: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (rentId) {
      axios
        .get(`/api/rent/${rentId}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            totalRent: data.totalRent,
            rentPaid: data.rentPaid,
            due: data.due,
            electricityAmountDue: data.electricity.amountDue,
            electricityAmountPaid: data.electricity.amountPaid,
            remarks: data.remarks || '',
          });
        })
        .catch(() => {
          setError('Error fetching rent details');
        });
    }
  }, [rentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updatedRent = {
        ...formData,
        room: room,
      };

      await axios.put(`/api/rent/${rentId}`, updatedRent);
      onUpdate();
      onClose();
    } catch {
      setError('Failed to update rent details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
        <div className='bg-black opacity-50 h-[100vh] w-[100%] absolute'></div>
      <div className="bg-white z-1 rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Update Rent Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="totalRent">Total Rent</label>
              <input
                type="number"
                name="totalRent"
                id="totalRent"
                value={formData.totalRent}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="rentPaid">Rent Paid</label>
              <input
                type="number"
                name="rentPaid"
                id="rentPaid"
                value={formData.rentPaid}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="due">Due Amount</label>
              <input
                type="number"
                name="due"
                id="due"
                value={formData.totalRent - formData.rentPaid}
                disabled
                className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="electricityAmountDue">Electricity Due</label>
              <input
                type="number"
                name="electricityAmountDue"
                id="electricityAmountDue"
                value={formData.electricityAmountDue}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600" htmlFor="electricityAmountPaid">Electricity Paid</label>
              <input
                type="number"
                name="electricityAmountPaid"
                id="electricityAmountPaid"
                value={formData.electricityAmountPaid}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="remarks">Remarks</label>
            <textarea
              name="remarks"
              id="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Rent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRentModal;

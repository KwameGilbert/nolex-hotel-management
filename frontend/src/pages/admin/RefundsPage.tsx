import { useEffect, useState } from 'react';
import { LoaderCircle, Plus, RefreshCw } from 'lucide-react';
import axios from 'axios';

interface Refund {
  id: string;
  bookingId: string;
  customer: string;
  amount: number;
  status: string;
  requestedAt: string;
}

export default function RefundsPage() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ bookingId: '', amount: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchRefunds() {
      setLoading(true);
      try {
        // Placeholder API URL
        const response = await axios.get('https://your-placeholder-api-url.com/refunds');
        setRefunds(response.data.refunds || []);
      } catch (error) {
        setRefunds([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRefunds();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder submit logic
    setTimeout(() => {
      setSubmitting(false);
      setShowForm(false);
      // Optionally refresh refund list
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Refund Requests</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" /> New Refund Request
          </button>
        </div>
        {/* Modern Modal Popup for Refund Form */}
        {showForm && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 z-40 bg-[#4a4a4a4a] bg-opacity-40 backdrop-blur-sm" onClick={() => setShowForm(false)}></div>
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
              <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">New Refund Request</h3>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Booking ID</label>
                      <input name="bookingId" value={form.bookingId} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input name="amount" type="number" value={form.amount} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea name="reason" value={form.reason} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                  </div>
                  <div className="flex justify-end gap-4 mt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={submitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 flex items-center">
                      {submitting ? (<><LoaderCircle className="animate-spin w-4 h-4 mr-2" />Submitting...</>) : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <span className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" role="status" aria-label="Loading"></span>
          </div>
        ) : refunds.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No refund requests found.</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refunds.map(refund => (
                  <tr key={refund.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refund.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refund.bookingId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{refund.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${refund.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${refund.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : refund.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{refund.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(refund.requestedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 
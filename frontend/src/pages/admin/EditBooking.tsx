import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X, Users, Phone, MapPin, Calendar, CreditCard, LoaderCircle, Edit } from 'lucide-react';
import axios from 'axios';

interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  nationality: string;
  id_type: string;
  id_number: string;
}

interface Booking {
  id: string;
  customer: Customer;
  phone: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  total: number | string;
}

export default function EditBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [editForm, setEditForm] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://hotel-management-system-5gk8.onrender.com/v1/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API response:', response.data);
        setBooking({
          id: response.data.booking.id,
          customer: response.data.booking.customer,
          phone: response.data.booking.phone,
          room: response.data.booking.room_id,
          roomType: response.data.booking.room_type_name,
          checkIn: response.data.booking.check_in,
          checkOut: response.data.booking.check_out,
          guests: response.data.booking.guests,
          status: response.data.booking.status,
          total: response.data.booking.total
        });
        setEditForm({
          id: response.data.booking.id,
          customer: response.data.booking.customer,
          phone: response.data.booking.phone,
          room: response.data.booking.room_id,
          roomType: response.data.booking.room_type_name,
          checkIn: response.data.booking.check_in,
          checkOut: response.data.booking.check_out,
          guests: response.data.booking.guests,
          status: response.data.booking.status,
          total: response.data.booking.total
        });
      } catch (error) {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [bookingId]);

  const handleFormChange = (field: keyof Booking, value: string | number) => {
    setEditForm(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleCustomerChange = (field: keyof Customer, value: string) => {
    setEditForm(prev => prev ? {
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    } : prev);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await axios.put(
        'https://your-placeholder-api-url.com/bookings/update',
        editForm,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
    } catch (error) {
      // handle error, e.g., show a notification
    } finally {
      setEditLoading(false);
    }
  };

  // Add refund navigation handler
  const handleRefundClick = () => {
    navigate('/admin/refunds');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="inline-block w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" role="status" aria-label="Loading"></span>
    </div>
  );
  if (!booking || !editForm) return <div className="p-6 text-red-500 text-sm text-center">Booking not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 px-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors mr-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Booking</h2>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-4 border-b pb-2 flex items-center"><Users className="w-4 h-4 mr-2" /> Customer Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                    <input type="text" value={editForm.customer.full_name} onChange={e => handleCustomerChange('full_name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter customer name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input type="tel" value={editForm.customer.phone} onChange={e => handleCustomerChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter phone number" required />
                  </div>
                </div>
              </div>
              {/* Room & Stay Info */}
              <div>
                <h4 className="font-semibold mb-4 border-b pb-2 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Room & Stay Information</h4>
                <div className="space-y-6">
                  {/* First row: Room Number & Room Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                      <input type="text" value={editForm.room} onChange={e => handleFormChange('room', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter room number" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                      <input type="text" value={editForm.roomType} onChange={e => handleFormChange('roomType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter room type" required />
                    </div>
                  </div>
                  {/* Second row: Number of Guests, Check-in, Check-out */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1">Number of Guests *</label>
                      <input type="number" min="1" max="10" value={editForm.guests} onChange={e => handleFormChange('guests', parseInt(e.target.value) || 1)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
                      <input type="date" value={editForm.checkIn} onChange={e => handleFormChange('checkIn', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
                      <input type="date" value={editForm.checkOut} onChange={e => handleFormChange('checkOut', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Info (full width) */}
              <div className="md:col-span-2 mt-8">
                <h4 className="font-semibold mb-4 border-b pb-2 flex items-center"><CreditCard className="w-4 h-4 mr-2" /> Booking Status & Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                    <select value={editForm.status} onChange={e => handleFormChange('status', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Checked In">Checked In</option>
                      <option value="Checked Out">Checked Out</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount *</label>
                    <input type="number" min="0" step="0.01" value={editForm.total} onChange={e => handleFormChange('total', parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter total amount" required />
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons (below the form, not sticky) */}
            <div className="flex flex-wrap gap-4 justify-end pt-8">
              <button type="button" onClick={() => navigate(-1)} disabled={editLoading} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={editLoading} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                {editLoading ? (<><LoaderCircle className="animate-spin w-4 h-4 mr-2" />Saving...</>) : (<><Edit className="w-4 h-4 mr-2" />Save Changes</>)}
              </button>
              <button type="button" onClick={handleRefundClick} className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                Refund
              </button>
            </div>
          </form>
        </div>

        {/* Summary Card */}
        <div className="bg-green-50 rounded-xl p-6 shadow-sm mb-24">
          <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">{editForm.customer.full_name}</span> has booked <span className="font-medium">Room {editForm.room}</span> ({editForm.roomType})</p>
            <p>for <span className="font-medium">{editForm.guests} {editForm.guests === 1 ? 'guest' : 'guests'}</span> from <span className="font-medium">{new Date(editForm.checkIn).toLocaleDateString()}</span> to <span className="font-medium">{new Date(editForm.checkOut).toLocaleDateString()}</span></p>
            <p>Total cost: <span className="font-medium text-green-600">{editForm.total}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
} 
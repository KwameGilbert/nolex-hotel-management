import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { X, Users, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
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

export default function ViewBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://hotel-management-system-5gk8.onrender.com/v1/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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
      } catch (error) {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [bookingId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };
  const formatCurrency = (amount: number | string | null | undefined): string => {
    if (amount === null || amount === undefined) return "$0.00";
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(numericAmount)) return "$0.00";
    return `$${numericAmount.toFixed(2)}`;
  };

  // Action handlers
  const handleCheckIn = () => {
    alert('Check In action triggered!');
    // TODO: Implement actual check-in logic (API call)
  };
  const handleCheckOut = () => {
    alert('Check Out action triggered!');
    // TODO: Implement actual check-out logic (API call)
  };
  const handleRefundClick = () => {
    navigate('/admin/refunds');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="inline-block w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" role="status" aria-label="Loading"></span>
    </div>
  );
  if (!booking) return <div className="p-6 text-red-500 text-sm text-center">Booking not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      {/* Back Button and Header */}
      <div className="flex items-center mb-8 px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition-colors mr-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Booking Details</h2>
      </div>
      {/* Main Content */}
      <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Customer Info */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" /> Customer Information
          </h4>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">{booking.customer.full_name}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Phone Number</p>
            <p className="font-medium text-gray-900">{booking.phone}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{booking.customer.email}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Nationality</p>
            <p className="font-medium text-gray-900">{booking.customer.nationality}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">ID Type</p>
            <p className="font-medium text-gray-900">{booking.customer.id_type}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">ID Number</p>
            <p className="font-medium text-gray-900">{booking.customer.id_number}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Address</p>
            <p className="font-medium text-gray-900">{booking.customer.address}</p>
          </div>
        </section>

        {/* Room Info */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" /> Room Information
          </h4>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Room Number</p>
            <p className="font-medium text-gray-900">Room {booking.room}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Room Type</p>
            <p className="font-medium text-gray-900">{booking.roomType}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Number of Guests</p>
            <p className="font-medium text-gray-900">{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</p>
          </div>
        </section>

        {/* Stay Info */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" /> Stay Information
          </h4>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Check-in Date</p>
            <p className="font-medium text-gray-900">{formatDate(booking.checkIn)}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Check-out Date</p>
            <p className="font-medium text-gray-900">{formatDate(booking.checkOut)}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Duration</p>
            <p className="font-medium text-gray-900">{Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</p>
          </div>
        </section>

        {/* Payment Info */}
        <section className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2">
          <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-blue-500" /> Payment Information
          </h4>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="font-medium text-gray-900 text-lg">{formatCurrency(booking.total)}</p>
          </div>
          <div className="mb-2">
            <p className="text-xs text-gray-500">Payment Status</p>
            <p className="font-medium text-gray-900">{booking.status === "Confirmed" || booking.status === "Checked In" || booking.status === "Checked Out" ? "Paid" : booking.status === "Pending" ? "Pending Payment" : "Cancelled"}</p>
          </div>
        </section>

        {/* Booking Summary (right after Payment Info, fills rest of row) */}
        <section className="bg-green-50 rounded-xl p-6 shadow-sm flex flex-col gap-2 lg:col-span-2">
          <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">{booking.customer.full_name}</span> has booked <span className="font-medium">Room {booking.room}</span> ({booking.roomType})</p>
            <p>for <span className="font-medium">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span> from <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span> to <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span></p>
            <p>Total cost: <span className="font-medium text-green-600">{formatCurrency(booking.total)}</span></p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-end col-span-full pt-6">
          {booking.status && booking.status.toLowerCase() === 'pending' && (
            <>
              <button onClick={handleCheckIn} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Check In</button>
              <button onClick={handleRefundClick} className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition">Refund</button>
            </>
          )}
          {booking.status && booking.status.toLowerCase() === 'checked in' && (
            <>
              <button onClick={handleCheckOut} className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">Check Out</button>
              <button onClick={handleRefundClick} className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition">Refund</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 
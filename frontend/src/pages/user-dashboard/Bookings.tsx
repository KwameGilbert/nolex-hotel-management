import React, { useState, useEffect } from "react";
import { Calendar, MapPin, CreditCard, Filter, Search, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalAmount: number;
  hotelName: string;
  guests: number;
  bookingDate: string;
  confirmationNumber: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate loading bookings
    setTimeout(() => {
      const mockBookings: Booking[] = [
        {
          id: "1",
          checkIn: "2024-01-15",
          checkOut: "2024-01-18",
          roomType: "Deluxe Room",
          status: "completed",
          totalAmount: 450,
          hotelName: "Azure Horizon - Main Branch",
          guests: 2,
          bookingDate: "2024-01-10",
          confirmationNumber: "AH-2024-001"
        },
        {
          id: "2",
          checkIn: "2024-02-20",
          checkOut: "2024-02-22",
          roomType: "Executive Suite",
          status: "confirmed",
          totalAmount: 650,
          hotelName: "Azure Horizon - Downtown",
          guests: 2,
          bookingDate: "2024-02-15",
          confirmationNumber: "AH-2024-002"
        },
        {
          id: "3",
          checkIn: "2024-03-10",
          checkOut: "2024-03-12",
          roomType: "Presidential Suite",
          status: "pending",
          totalAmount: 1200,
          hotelName: "Azure Horizon - Beach Resort",
          guests: 4,
          bookingDate: "2024-03-05",
          confirmationNumber: "AH-2024-003"
        },
        {
          id: "4",
          checkIn: "2024-04-05",
          checkOut: "2024-04-08",
          roomType: "Family Room",
          status: "cancelled",
          totalAmount: 800,
          hotelName: "Azure Horizon - Main Branch",
          guests: 3,
          bookingDate: "2024-03-20",
          confirmationNumber: "AH-2024-004"
        }
      ];
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    Swal.fire({
      title: "Cancel Booking",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement cancel booking API call
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: "cancelled" as const }
            : booking
        ));
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#1A365D]">
              My Bookings
            </h2>
            <p className="text-gray-600">
              Manage and track all your hotel reservations
            </p>
          </div>
          <Link
            to="/book"
            className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
          >
            New Booking
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            {(searchTerm || statusFilter !== "all") && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 text-[#C9A55C] hover:text-[#B89448] transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A365D] mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters"
                : "You haven't made any bookings yet"
              }
            </p>
            <Link
              to="/book"
              className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
            >
              Book Your First Stay
            </Link>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A365D] mb-1">
                        {booking.roomType}
                      </h3>
                      <p className="text-gray-600 mb-2">{booking.hotelName}</p>
                      <p className="text-sm text-gray-500">
                        Confirmation: {booking.confirmationNumber}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{booking.guests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">${booking.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  {booking.status === "confirmed" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#1A365D] mb-4">Booking Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1A365D]">{bookings.length}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === "confirmed").length}
            </p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {bookings.filter(b => b.status === "completed").length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#C9A55C]">
              ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from "react";
import { User, Calendar, MapPin, CreditCard, Settings, LogOut, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: "confirmed" | "pending" | "cancelled";
  totalAmount: number;
  hotelName: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUser(parsedData.user);
    }

    // Simulate loading bookings
    setTimeout(() => {
      setBookings([
        {
          id: "1",
          checkIn: "2024-01-15",
          checkOut: "2024-01-18",
          roomType: "Deluxe Room",
          status: "confirmed",
          totalAmount: 450,
          hotelName: "Azure Horizon - Main Branch"
        },
        {
          id: "2",
          checkIn: "2024-02-20",
          checkOut: "2024-02-22",
          roomType: "Executive Suite",
          status: "pending",
          totalAmount: 650,
          hotelName: "Azure Horizon - Downtown"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#C9A55C",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userData");
        window.location.href = "/user-login";
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-serif font-bold text-[#C9A55C]">
                Azure Horizon
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none text-sm"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#C9A55C] rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#1A365D]">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600">
                Manage your bookings and explore our exclusive offers
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "bookings", label: "My Bookings", icon: Calendar },
                { id: "profile", label: "Profile", icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-[#C9A55C] text-[#C9A55C]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-[#C9A55C] to-[#B89448] rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Total Bookings</p>
                        <p className="text-2xl font-bold">{bookings.length}</p>
                      </div>
                      <Calendar className="h-8 w-8 opacity-80" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-[#1A365D] to-[#2D5A8B] rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Active Bookings</p>
                        <p className="text-2xl font-bold">
                          {bookings.filter(b => b.status === "confirmed").length}
                        </p>
                      </div>
                      <MapPin className="h-8 w-8 opacity-80" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Total Spent</p>
                        <p className="text-2xl font-bold">
                          ${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
                        </p>
                      </div>
                      <CreditCard className="h-8 w-8 opacity-80" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#1A365D] mb-4">
                    Recent Bookings
                  </h3>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-[#1A365D]">{booking.roomType}</h4>
                            <p className="text-sm text-gray-600">{booking.hotelName}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <p className="text-sm font-medium text-[#1A365D] mt-1">
                              ${booking.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#1A365D]">
                    My Bookings
                  </h3>
                  <Link
                    to="/book"
                    className="bg-[#C9A55C] text-white px-4 py-2 rounded-lg hover:bg-[#B89448] transition-colors text-sm font-medium"
                  >
                    New Booking
                  </Link>
                </div>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <h4 className="text-lg font-semibold text-[#1A365D]">{booking.roomType}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{booking.hotelName}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Check-in: {formatDate(booking.checkIn)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Check-out: {formatDate(booking.checkOut)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#1A365D]">
                            ${booking.totalAmount}
                          </p>
                          <button className="text-[#C9A55C] hover:text-[#B89448] text-sm font-medium mt-2">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-[#1A365D]">
                  Profile Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={user?.firstName || ""}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={user?.lastName || ""}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={user?.phone || ""}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
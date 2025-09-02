import React, { useState, useEffect } from "react";
import { Calendar, MapPin, CreditCard, Star, TrendingUp, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalAmount: number;
  hotelName: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  hotelName: string;
  date: string;
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setBookings([
        {
          id: "1",
          checkIn: "2024-01-15",
          checkOut: "2024-01-18",
          roomType: "Deluxe Room",
          status: "completed",
          totalAmount: 450,
          hotelName: "Azure Horizon - Main Branch"
        },
        {
          id: "2",
          checkIn: "2024-02-20",
          checkOut: "2024-02-22",
          roomType: "Executive Suite",
          status: "confirmed",
          totalAmount: 650,
          hotelName: "Azure Horizon - Downtown"
        },
        {
          id: "3",
          checkIn: "2024-03-10",
          checkOut: "2024-03-12",
          roomType: "Presidential Suite",
          status: "pending",
          totalAmount: 1200,
          hotelName: "Azure Horizon - Beach Resort"
        }
      ]);

      setReviews([
        {
          id: "1",
          rating: 5,
          comment: "Excellent service and beautiful rooms. Highly recommended!",
          hotelName: "Azure Horizon - Main Branch",
          date: "2024-01-20"
        },
        {
          id: "2",
          rating: 4,
          comment: "Great location and friendly staff. Will definitely return.",
          hotelName: "Azure Horizon - Downtown",
          date: "2024-02-25"
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

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

  const stats = [
    {
      name: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "from-[#C9A55C] to-[#B89448]",
      change: "+12%",
      changeType: "increase"
    },
    {
      name: "Active Bookings",
      value: bookings.filter(b => b.status === "confirmed").length,
      icon: MapPin,
      color: "from-[#1A365D] to-[#2D5A8B]",
      change: "+5%",
      changeType: "increase"
    },
    {
      name: "Total Spent",
      value: `$${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}`,
      icon: CreditCard,
      color: "from-green-500 to-green-600",
      change: "+8%",
      changeType: "increase"
    },
    {
      name: "Reviews Given",
      value: reviews.length,
      icon: Star,
      color: "from-purple-500 to-purple-600",
      change: "+2",
      changeType: "increase"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-0 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-serif font-bold text-[#1A365D] mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your bookings and account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-xl font-bold text-[#1A365D]">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-3 w-3 mr-1 ${
                    stat.changeType === "increase" ? "text-green-500" : "text-red-500"
                  }`} />
                  <span className={`text-xs font-medium ${
                    stat.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#1A365D]">Recent Bookings</h3>
            <Link
              to="/user-dashboard/bookings"
              className="text-[#C9A55C] hover:text-[#B89448] text-sm font-medium transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-[#1A365D] text-sm">{booking.roomType}</h4>
                  <p className="text-xs text-gray-600">{booking.hotelName}</p>
                  <p className="text-xs text-gray-500">
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
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-[#1A365D] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/book"
              className="flex items-center space-x-3 p-3 bg-[#C9A55C] text-white rounded-lg hover:bg-[#B89448] transition-colors"
            >
              <Calendar className="h-4 w-4" />
              <span className="font-medium text-sm">New Booking</span>
            </Link>
            <Link
              to="/user-dashboard/reviews"
              className="flex items-center space-x-3 p-3 bg-gray-100 text-[#1A365D] rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Star className="h-4 w-4" />
              <span className="font-medium text-sm">Write Review</span>
            </Link>
            <Link
              to="/user-dashboard/complaints"
              className="flex items-center space-x-3 p-3 bg-gray-100 text-[#1A365D] rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium text-sm">Report Issue</span>
            </Link>
            <Link
              to="/user-dashboard/profile"
              className="flex items-center space-x-3 p-3 bg-gray-100 text-[#1A365D] rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span className="font-medium text-sm">Update Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#1A365D]">Recent Reviews</h3>
          <Link
            to="/user-dashboard/reviews"
            className="text-[#C9A55C] hover:text-[#B89448] text-sm font-medium transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.slice(0, 2).map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-[#1A365D] text-sm">{review.hotelName}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{review.comment}</p>
              <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
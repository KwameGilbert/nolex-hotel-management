import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Phone, Mail, MapPin, Users, AlertCircle, LoaderCircle } from "lucide-react";
import axios from "axios";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  totalBookings: number;
}

export default function ViewCustomer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          `https://hotel-management-system-5gk8.onrender.com/v1/customers/${id}`
        );
        setCustomer(response.data.customer);
      } catch (err) {
        console.error("Error fetching customer:", err);
        setError("Customer not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  const getBookingStatusText = (totalBookings: number) => {
    if (totalBookings === 0) return "New Customer";
    if (totalBookings === 1) return "First-time Guest";
    if (totalBookings <= 5) return "Regular Guest";
    return "VIP Guest";
  };

  const getBookingStatusColor = (totalBookings: number) => {
    if (totalBookings === 0) return "bg-gray-100 text-gray-800";
    if (totalBookings === 1) return "bg-blue-100 text-blue-800";
    if (totalBookings <= 5) return "bg-green-100 text-green-800";
    return "bg-purple-100 text-purple-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2 text-gray-600">
          <LoaderCircle className="animate-spin h-6 w-6" />
          <span>Loading customer details...</span>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg font-medium mb-2">Customer not found</div>
          <button
            onClick={() => navigate("/admin/customers")}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/customers")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Customers
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">Customer Details</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/admin/customers/${id}/edit`)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Edit Customer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
                  <p className="text-sm text-gray-500">Customer ID: {customer.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBookingStatusColor(customer.totalBookings)}`}>
                  {getBookingStatusText(customer.totalBookings)}
                </span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer ID</p>
                  <p className="font-medium text-gray-900 font-mono text-sm">{customer.id}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Number
                  </p>
                  <p className="font-medium text-gray-900">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    Email Address
                  </p>
                  <p className="font-medium text-gray-900">{customer.email}</p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Address Information
              </h3>
              <div>
                <p className="text-sm text-gray-500">Residential Address</p>
                <p className="font-medium text-gray-900">{customer.address}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Emergency Contact
              </h3>
              <div>
                <p className="text-sm text-gray-500">Emergency Contact Details</p>
                <p className="font-medium text-gray-900">{customer.emergencyContact}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Statistics & Summary */}
          <div className="space-y-6">
            {/* Booking Statistics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                Booking Statistics
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-indigo-600">{customer.totalBookings}</p>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                </div>
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBookingStatusColor(customer.totalBookings)}`}>
                    {getBookingStatusText(customer.totalBookings)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Summary */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Summary</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium">{customer.name}</span> is a{" "}
                  <span className="font-medium">{getBookingStatusText(customer.totalBookings).toLowerCase()}</span> with{" "}
                  <span className="font-medium">{customer.totalBookings}</span> total booking{customer.totalBookings !== 1 ? 's' : ''}.
                </p>
                <p>
                  Contact: <span className="font-medium">{customer.phone}</span>
                </p>
                <p>
                  Email: <span className="font-medium">{customer.email}</span>
                </p>
                <p>
                  Address: <span className="font-medium">{customer.address}</span>
                </p>
                {customer.emergencyContact && (
                  <p>
                    Emergency Contact: <span className="font-medium">{customer.emergencyContact}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/admin/customers/${id}/edit`)}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Edit Customer
                </button>
                <button
                  onClick={() => navigate("/admin/bookings")}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  View Bookings
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
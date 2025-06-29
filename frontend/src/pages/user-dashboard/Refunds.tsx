import React, { useState, useEffect } from "react";
import { CreditCard, Clock, CheckCircle, XCircle, AlertCircle, Plus, Filter } from "lucide-react";
import Swal from "sweetalert2";

interface Refund {
  id: string;
  bookingId: string;
  bookingNumber: string;
  amount: number;
  reason: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  processedDate?: string;
  refundMethod: "credit_card" | "bank_transfer" | "wallet";
  description: string;
}

export default function Refunds() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [filteredRefunds, setFilteredRefunds] = useState<Refund[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({
    bookingNumber: "",
    amount: "",
    reason: "",
    description: ""
  });

  useEffect(() => {
    // Simulate loading refunds
    setTimeout(() => {
      const mockRefunds: Refund[] = [
        {
          id: "1",
          bookingId: "1",
          bookingNumber: "AH-2024-001",
          amount: 150,
          reason: "Early Checkout",
          status: "completed",
          requestDate: "2024-01-16",
          processedDate: "2024-01-18",
          refundMethod: "credit_card",
          description: "Checked out 1 day early due to emergency"
        },
        {
          id: "2",
          bookingId: "2",
          bookingNumber: "AH-2024-002",
          amount: 200,
          reason: "Service Issue",
          status: "approved",
          requestDate: "2024-02-21",
          processedDate: "2024-02-23",
          refundMethod: "bank_transfer",
          description: "Air conditioning not working properly"
        },
        {
          id: "3",
          bookingId: "3",
          bookingNumber: "AH-2024-003",
          amount: 300,
          reason: "Cancellation",
          status: "pending",
          requestDate: "2024-03-06",
          refundMethod: "credit_card",
          description: "Trip cancelled due to weather conditions"
        },
        {
          id: "4",
          bookingId: "4",
          bookingNumber: "AH-2024-004",
          amount: 400,
          reason: "Double Booking",
          status: "rejected",
          requestDate: "2024-03-25",
          refundMethod: "wallet",
          description: "Accidentally booked same room twice"
        }
      ];
      setRefunds(mockRefunds);
      setFilteredRefunds(mockRefunds);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = refunds;
    if (statusFilter !== "all") {
      filtered = refunds.filter(refund => refund.status === statusFilter);
    }
    setFilteredRefunds(filtered);
  }, [refunds, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleRequestRefund = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestForm.bookingNumber || !requestForm.amount || !requestForm.reason) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    const newRefund: Refund = {
      id: Date.now().toString(),
      bookingId: requestForm.bookingNumber,
      bookingNumber: requestForm.bookingNumber,
      amount: parseFloat(requestForm.amount),
      reason: requestForm.reason,
      status: "pending",
      requestDate: new Date().toISOString().split('T')[0],
      refundMethod: "credit_card",
      description: requestForm.description
    };

    setRefunds(prev => [newRefund, ...prev]);
    setShowRequestModal(false);
    setRequestForm({
      bookingNumber: "",
      amount: "",
      reason: "",
      description: ""
    });

    Swal.fire({
      title: "Refund Requested",
      text: "Your refund request has been submitted successfully.",
      icon: "success",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading refunds...</p>
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
              Refunds
            </h2>
            <p className="text-gray-600">
              Track your refund requests and history
            </p>
          </div>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center space-x-2 bg-[#C9A55C] text-white px-4 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Request Refund</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Refunds List */}
      <div className="space-y-4">
        {filteredRefunds.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A365D] mb-2">No refunds found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter !== "all" 
                ? "No refunds match the selected filter"
                : "You haven't requested any refunds yet"
              }
            </p>
            {statusFilter === "all" && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
              >
                Request Your First Refund
              </button>
            )}
          </div>
        ) : (
          filteredRefunds.map((refund) => (
            <div key={refund.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A365D] mb-1">
                        Refund #{refund.id}
                      </h3>
                      <p className="text-gray-600 mb-2">Booking: {refund.bookingNumber}</p>
                      <p className="text-sm text-gray-500">
                        Requested: {formatDate(refund.requestDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(refund.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(refund.status)}`}>
                        {refund.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-semibold text-[#1A365D]">${refund.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reason</p>
                      <p className="font-semibold text-[#1A365D]">{refund.reason}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Method</p>
                      <p className="font-semibold text-[#1A365D] capitalize">
                        {refund.refundMethod.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {refund.description && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">{refund.description}</p>
                    </div>
                  )}

                  {refund.processedDate && (
                    <p className="text-sm text-gray-500 mt-2">
                      Processed: {formatDate(refund.processedDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#1A365D] mb-4">Refund Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1A365D]">{refunds.length}</p>
            <p className="text-sm text-gray-600">Total Requests</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {refunds.filter(r => r.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {refunds.filter(r => r.status === "completed").length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#C9A55C]">
              ${refunds.filter(r => r.status === "completed").reduce((sum, r) => sum + r.amount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Refunded</p>
          </div>
        </div>
      </div>

      {/* Request Refund Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1A365D]">Request Refund</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleRequestRefund} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Number *
                </label>
                <input
                  type="text"
                  value={requestForm.bookingNumber}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, bookingNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  placeholder="e.g., AH-2024-001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={requestForm.amount}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <select
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Early Checkout">Early Checkout</option>
                  <option value="Service Issue">Service Issue</option>
                  <option value="Cancellation">Cancellation</option>
                  <option value="Double Booking">Double Booking</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={requestForm.description}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  rows={3}
                  placeholder="Please provide additional details..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#C9A55C] text-white py-2 rounded-lg hover:bg-[#B89448] transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
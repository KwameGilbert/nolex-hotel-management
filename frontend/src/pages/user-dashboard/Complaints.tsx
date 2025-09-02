import React, { useState, useEffect } from "react";
import { MessageSquare, AlertTriangle, Plus, Filter, Eye, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2";

interface Complaint {
  id: string;
  bookingId: string;
  bookingNumber: string;
  hotelName: string;
  category: string;
  subject: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  date: string;
  lastUpdated: string;
  attachments?: string[];
  responses?: ComplaintResponse[];
}

interface ComplaintResponse {
  id: string;
  from: "user" | "staff";
  message: string;
  date: string;
}

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaintForm, setComplaintForm] = useState({
    bookingNumber: "",
    category: "",
    subject: "",
    description: "",
    priority: "medium" as const
  });

  useEffect(() => {
    // Simulate loading complaints
    setTimeout(() => {
      const mockComplaints: Complaint[] = [
        {
          id: "1",
          bookingId: "1",
          bookingNumber: "AH-2024-001",
          hotelName: "Azure Horizon - Main Branch",
          category: "Room Service",
          subject: "Late Room Service",
          description: "Room service took over 2 hours to deliver our order. This is unacceptable for a luxury hotel.",
          priority: "medium",
          status: "resolved",
          date: "2024-01-16",
          lastUpdated: "2024-01-18",
          responses: [
            {
              id: "1",
              from: "staff",
              message: "We apologize for the delay. We have addressed this issue with our kitchen staff.",
              date: "2024-01-17"
            },
            {
              id: "2",
              from: "user",
              message: "Thank you for addressing this. The service improved significantly after your response.",
              date: "2024-01-18"
            }
          ]
        },
        {
          id: "2",
          bookingId: "2",
          bookingNumber: "AH-2024-002",
          hotelName: "Azure Horizon - Downtown",
          category: "Maintenance",
          subject: "Air Conditioning Issue",
          description: "The air conditioning in our room is not working properly. It's making loud noises and not cooling effectively.",
          priority: "high",
          status: "in_progress",
          date: "2024-02-21",
          lastUpdated: "2024-02-22",
          responses: [
            {
              id: "3",
              from: "staff",
              message: "We have dispatched our maintenance team to fix the AC unit. They should arrive within 30 minutes.",
              date: "2024-02-21"
            }
          ]
        },
        {
          id: "3",
          bookingId: "3",
          bookingNumber: "AH-2024-003",
          hotelName: "Azure Horizon - Beach Resort",
          category: "Billing",
          subject: "Incorrect Charges",
          description: "I was charged for services I did not use. Please review and correct the billing.",
          priority: "urgent",
          status: "open",
          date: "2024-03-15",
          lastUpdated: "2024-03-15"
        }
      ];
      setComplaints(mockComplaints);
      setFilteredComplaints(mockComplaints);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = complaints;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }
    
    if (priorityFilter !== "all") {
      filtered = filtered.filter(complaint => complaint.priority === priorityFilter);
    }
    
    setFilteredComplaints(filtered);
  }, [complaints, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "closed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!complaintForm.bookingNumber || !complaintForm.category || !complaintForm.subject || !complaintForm.description) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    const newComplaint: Complaint = {
      id: Date.now().toString(),
      bookingId: complaintForm.bookingNumber,
      bookingNumber: complaintForm.bookingNumber,
      hotelName: "Azure Horizon - Main Branch", // This would come from the booking
      category: complaintForm.category,
      subject: complaintForm.subject,
      description: complaintForm.description,
      priority: complaintForm.priority,
      status: "open",
      date: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setShowSubmitModal(false);
    setComplaintForm({
      bookingNumber: "",
      category: "",
      subject: "",
      description: "",
      priority: "medium"
    });

    Swal.fire({
      title: "Complaint Submitted",
      text: "Your complaint has been submitted successfully. We'll get back to you soon.",
      icon: "success",
    });
  };

  const handleDeleteComplaint = (complaintId: string) => {
    Swal.fire({
      title: "Delete Complaint",
      text: "Are you sure you want to delete this complaint?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setComplaints(prev => prev.filter(complaint => complaint.id !== complaintId));
        Swal.fire("Deleted!", "Your complaint has been deleted.", "success");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complaints...</p>
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
              Complaints & Support
            </h2>
            <p className="text-gray-600">
              Report issues and get help with your bookings
            </p>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center space-x-2 bg-[#C9A55C] text-white px-4 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Complaint</span>
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
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A365D] mb-2">No complaints found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter !== "all" || priorityFilter !== "all"
                ? "No complaints match the selected filters"
                : "You haven't submitted any complaints yet"
              }
            </p>
            {statusFilter === "all" && priorityFilter === "all" && (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
              >
                Submit Your First Complaint
              </button>
            )}
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A365D] mb-1">
                        {complaint.subject}
                      </h3>
                      <p className="text-gray-600 mb-2">{complaint.hotelName}</p>
                      <p className="text-sm text-gray-500">
                        Booking: {complaint.bookingNumber} • {formatDate(complaint.date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Category: {complaint.category}</p>
                    <p className="text-gray-700 line-clamp-2">{complaint.description}</p>
                  </div>

                  {complaint.responses && complaint.responses.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        Last updated: {formatDate(complaint.lastUpdated)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {complaint.responses.length} response{complaint.responses.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setShowDetailModal(true);
                    }}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  {complaint.status === "open" && (
                    <button
                      onClick={() => handleDeleteComplaint(complaint.id)}
                      className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
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
        <h3 className="text-lg font-semibold text-[#1A365D] mb-4">Complaint Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1A365D]">{complaints.length}</p>
            <p className="text-sm text-gray-600">Total Complaints</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {complaints.filter(c => c.status === "open").length}
            </p>
            <p className="text-sm text-gray-600">Open</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {complaints.filter(c => c.status === "in_progress").length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {complaints.filter(c => c.status === "resolved").length}
            </p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
        </div>
      </div>

      {/* Submit Complaint Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1A365D]">Submit Complaint</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Number *
                </label>
                <input
                  type="text"
                  value={complaintForm.bookingNumber}
                  onChange={(e) => setComplaintForm(prev => ({ ...prev, bookingNumber: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  placeholder="e.g., AH-2024-001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={complaintForm.category}
                  onChange={(e) => setComplaintForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Room Service">Room Service</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Billing">Billing</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Noise">Noise</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  value={complaintForm.priority}
                  onChange={(e) => setComplaintForm(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={complaintForm.subject}
                  onChange={(e) => setComplaintForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={complaintForm.description}
                  onChange={(e) => setComplaintForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  rows={4}
                  placeholder="Please provide detailed information about the issue..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#C9A55C] text-white py-2 rounded-lg hover:bg-[#B89448] transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {showDetailModal && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1A365D]">Complaint Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#1A365D] mb-2">{selectedComplaint.subject}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>Booking: {selectedComplaint.bookingNumber}</span>
                  <span>Category: {selectedComplaint.category}</span>
                  <span>Date: {formatDate(selectedComplaint.date)}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedComplaint.priority)}`}>
                    {selectedComplaint.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                    {selectedComplaint.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-700">{selectedComplaint.description}</p>
              </div>

              {selectedComplaint.responses && selectedComplaint.responses.length > 0 && (
                <div>
                  <h5 className="font-semibold text-[#1A365D] mb-4">Responses</h5>
                  <div className="space-y-4">
                    {selectedComplaint.responses.map((response) => (
                      <div key={response.id} className={`p-4 rounded-lg ${
                        response.from === "staff" ? "bg-blue-50" : "bg-gray-50"
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-sm font-medium ${
                            response.from === "staff" ? "text-blue-600" : "text-gray-600"
                          }`}>
                            {response.from === "staff" ? "Hotel Staff" : "You"}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(response.date)}</span>
                        </div>
                        <p className="text-gray-700">{response.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
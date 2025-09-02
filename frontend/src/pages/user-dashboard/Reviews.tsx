import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Plus, Edit, Trash2, Filter } from "lucide-react";
import Swal from "sweetalert2";

interface Review {
  id: string;
  bookingId: string;
  bookingNumber: string;
  hotelName: string;
  roomType: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: "published" | "pending" | "rejected";
  helpful: number;
  images?: string[];
}

interface Booking {
  id: string;
  bookingNumber: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: "completed";
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: ""
  });

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: "1",
          bookingId: "1",
          bookingNumber: "AH-2024-001",
          hotelName: "Azure Horizon - Main Branch",
          roomType: "Deluxe Room",
          rating: 5,
          title: "Excellent Experience",
          comment: "The service was outstanding and the room was immaculate. Staff was very friendly and helpful throughout our stay.",
          date: "2024-01-20",
          status: "published",
          helpful: 12
        },
        {
          id: "2",
          bookingId: "2",
          bookingNumber: "AH-2024-002",
          hotelName: "Azure Horizon - Downtown",
          roomType: "Executive Suite",
          rating: 4,
          title: "Great Location",
          comment: "Perfect location in the heart of the city. Room was spacious and clean. Would definitely recommend.",
          date: "2024-02-25",
          status: "published",
          helpful: 8
        },
        {
          id: "3",
          bookingId: "3",
          bookingNumber: "AH-2024-003",
          hotelName: "Azure Horizon - Beach Resort",
          roomType: "Presidential Suite",
          rating: 3,
          title: "Good but could be better",
          comment: "The room was nice but the service was a bit slow. Food quality was average.",
          date: "2024-03-15",
          status: "pending",
          helpful: 3
        }
      ];

      const mockBookings: Booking[] = [
        {
          id: "4",
          bookingNumber: "AH-2024-004",
          hotelName: "Azure Horizon - Mountain View",
          roomType: "Family Room",
          checkIn: "2024-04-01",
          checkOut: "2024-04-05",
          status: "completed"
        }
      ];

      setReviews(mockReviews);
      setFilteredReviews(mockReviews);
      setBookings(mockBookings);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = reviews;
    if (statusFilter !== "all") {
      filtered = reviews.filter(review => review.status === statusFilter);
    }
    setFilteredReviews(filtered);
  }, [reviews, statusFilter]);

  const handleWriteReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBooking || !reviewForm.title || !reviewForm.comment) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      bookingId: selectedBooking.id,
      bookingNumber: selectedBooking.bookingNumber,
      hotelName: selectedBooking.hotelName,
      roomType: selectedBooking.roomType,
      rating: reviewForm.rating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);
    setShowWriteModal(false);
    setSelectedBooking(null);
    setReviewForm({
      rating: 5,
      title: "",
      comment: ""
    });

    Swal.fire({
      title: "Review Submitted",
      text: "Your review has been submitted and is pending approval.",
      icon: "success",
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    Swal.fire({
      title: "Delete Review",
      text: "Are you sure you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setReviews(prev => prev.filter(review => review.id !== reviewId));
        Swal.fire("Deleted!", "Your review has been deleted.", "success");
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A55C] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
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
              My Reviews
            </h2>
            <p className="text-gray-600">
              Share your experiences and read your past reviews
            </p>
          </div>
          <button
            onClick={() => setShowWriteModal(true)}
            className="flex items-center space-x-2 bg-[#C9A55C] text-white px-4 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Write Review</span>
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
            <option value="all">All Reviews</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#1A365D] mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter !== "all" 
                ? "No reviews match the selected filter"
                : "You haven't written any reviews yet"
              }
            </p>
            {statusFilter === "all" && (
              <button
                onClick={() => setShowWriteModal(true)}
                className="bg-[#C9A55C] text-white px-6 py-2 rounded-lg hover:bg-[#B89448] transition-colors"
              >
                Write Your First Review
              </button>
            )}
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A365D] mb-1">
                        {review.title}
                      </h3>
                      <p className="text-gray-600 mb-2">{review.hotelName}</p>
                      <p className="text-sm text-gray-500">
                        {review.roomType} • {formatDate(review.date)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        review.status === "published" ? "bg-green-100 text-green-800" :
                        review.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {review.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">({review.rating}/5)</span>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Booking: {review.bookingNumber}</span>
                    <span>{review.helpful} people found this helpful</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-[#1A365D] mb-4">Review Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1A365D]">{reviews.length}</p>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {reviews.filter(r => r.status === "published").length}
            </p>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {reviews.filter(r => r.status === "pending").length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#C9A55C]">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1A365D]">Write a Review</h3>
              <button
                onClick={() => setShowWriteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleWriteReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Booking *
                </label>
                <select
                  value={selectedBooking?.id || ""}
                  onChange={(e) => {
                    const booking = bookings.find(b => b.id === e.target.value);
                    setSelectedBooking(booking || null);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  required
                >
                  <option value="">Choose a booking to review</option>
                  {bookings.map((booking) => (
                    <option key={booking.id} value={booking.id}>
                      {booking.bookingNumber} - {booking.hotelName} ({booking.roomType})
                    </option>
                  ))}
                </select>
              </div>

              {selectedBooking && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Hotel:</strong> {selectedBooking.hotelName}<br />
                    <strong>Room:</strong> {selectedBooking.roomType}<br />
                    <strong>Stay:</strong> {formatDate(selectedBooking.checkIn)} - {formatDate(selectedBooking.checkOut)}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= reviewForm.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({reviewForm.rating}/5)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  placeholder="Summarize your experience"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Comment *
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none"
                  rows={4}
                  placeholder="Share your detailed experience..."
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowWriteModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#C9A55C] text-white py-2 rounded-lg hover:bg-[#B89448] transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
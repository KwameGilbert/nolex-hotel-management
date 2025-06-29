"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Edit, Trash2, Mail, Phone, LoaderCircle, X, User, MapPin, Users, AlertCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface customersSummary {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  totalBookings: number;
}

// Add the missing interface
interface DeleteCustomerModal {
  isOpen: boolean;
  customer: customersSummary | null;
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<customersSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Add the missing state variable (add this with other useState declarations)
  const [deleteModal, setDeleteModal] = useState<DeleteCustomerModal>({ isOpen: false, customer: null });
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://hotel-management-system-5gk8.onrender.com/v1/customers/summary"
        );
        setCustomers(response.data.customersSummary || []);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Add the missing handler functions
  const handleDeleteCustomer = (customer: customersSummary) => {
    setDeleteModal({ isOpen: true, customer });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, customer: null });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.customer) return;
    
    setDeleteLoading(true);
    try {
      // TODO: Replace with your API endpoint
      await axios.delete(
        `https://hotel-management-system-5gk8.onrender.com/v1/customers/${deleteModal.customer.id}`
      );
      
      // Remove the deleted customer from the customers list
      setCustomers(prev => 
        prev.filter(customer => customer.id !== deleteModal.customer!.id)
      );
      
      closeDeleteModal();
      // TODO: Add success notification here
      console.log('Customer deleted successfully');
    } catch (error) {
      console.error('Error deleting customer:', error);
      // TODO: Add error notification here
    } finally {
      setDeleteLoading(false);
    }
  };

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
      <div className="flex justify-center items-center h-32 space-x-2 text-gray-600">
        <LoaderCircle className="animate-spin h-6 w-6" />
        <span>Loading customers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 bg-red-100 border border-red-300 rounded p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Desktop Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Emergency Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.emergencyContact}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.totalBookings}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => navigate(`/admin/customers/${customer.id}/view`)}
                        className="text-blue-600 hover:text-blue-900 transition-colors cursor-pointer"
                        title="View customer details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/admin/customers/${customer.id}/edit`)}
                        className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                        title="Edit customer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCustomer(customer)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        title="Delete customer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-2 mt-4">
        {customers.map((customer) => (
          <div key={customer.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="mb-2">
              <h4 className="font-medium text-gray-900">{customer.name}</h4>
              <p className="text-sm text-gray-600">{customer.phone} • {customer.address}</p>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Bookings: {customer.totalBookings} • Emergency: {customer.emergencyContact}
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigate(`/admin/customers/${customer.id}/view`)}
                className="text-blue-600 hover:text-blue-900 transition-colors"
                title="View customer details"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate(`/admin/customers/${customer.id}/edit`)}
                className="text-yellow-600 hover:text-yellow-900 cursor-pointer"
                title="Edit customer"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteCustomer(customer)}
                className="text-red-600 hover:text-red-900"
                title="Delete customer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Customer Modal - Fixed Height Issue */}
      {deleteModal.isOpen && deleteModal.customer && (
        <div className="fixed inset-0 bg-[#0000001A] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-gray-900">Delete Customer</h2>
                  <p className="text-xs text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              <button
                onClick={closeDeleteModal}
                disabled={deleteLoading}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-4 space-y-4">
              {/* Customer Information - Compact */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Customer to be deleted:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium text-gray-900">{deleteModal.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID:</span>
                    <span className="font-mono text-gray-900">{deleteModal.customer.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-gray-900">{deleteModal.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bookings:</span>
                    <span className="font-medium text-gray-900">{deleteModal.customer.totalBookings}</span>
                  </div>
                </div>
              </div>

              {/* Warning Message - Compact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-xs">
                    <h4 className="font-medium text-red-800 mb-1">Warning: Permanent Deletion</h4>
                    <ul className="text-red-700 space-y-0.5">
                      <li>• Permanently deletes customer record</li>
                      <li>• Removes all associated data</li>
                      {deleteModal.customer.totalBookings > 0 && (
                        <li>• Has {deleteModal.customer.totalBookings} booking record{deleteModal.customer.totalBookings !== 1 ? 's' : ''}</li>
                      )}
                      <li>• Cannot be reversed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Confirmation Text - Compact */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  <span className="font-medium">Confirm:</span> Delete 
                  <span className="font-medium"> {deleteModal.customer.name}</span>? 
                  This removes all information permanently.
                </p>
              </div>
            </div>

            {/* Modal Footer - Sticky */}
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <button
                onClick={closeDeleteModal}
                disabled={deleteLoading}
                className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="px-3 py-2 text-xs font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {deleteLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-3 h-3 mr-1" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
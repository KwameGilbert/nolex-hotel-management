import IssuesTable from "../../components/IssuesTable";
import { Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface IssueForm {
  title: string;
  location: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}

const Issues = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IssueForm>({
    title: "",
    location: "",
    description: "",
    priority: "Low",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Placeholder API endpoint - replace with actual endpoint later
      const response = await axios.post("/api/issues", {
        ...formData,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      Swal.fire({
        title: "Success!",
        text: "Issue reported successfully!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true
      });

      // Reset form and close modal
      setFormData({
        title: "",
        location: "",
        description: "",
        priority: "Low",
      });
      setShowModal(false);

    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to report issue. Please try again.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: "",
      location: "",
      description: "",
      priority: "Low",
    });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Issue Management</h1>
          <p className="text-blue-100">Manage and track issues</p>
        </div>

        <div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 cursor-pointer"
          >
            <Plus className="w-6 h-6" />
            Report New Issue
          </button>
        </div>
      </div>

      <div className="py-6">
        <IssuesTable />
      </div>

      {/* Report Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[85vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-8 space-y-4 h-full flex flex-col">
              <div className="sticky top-0 bg-white pb-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 mt-[10px]">Report New Issue</h2>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X className="w-6 h-6 cursor-pointer" />
                </button>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter issue title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location (e.g., Room 101, Lobby, Kitchen)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority *
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the issue in detail..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 border-t pb-[20px]">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <Plus className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Report Issue"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Issues;

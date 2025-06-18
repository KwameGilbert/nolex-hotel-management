import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FunnelIcon, Eye, Edit, Trash2, X } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  location: string;
  status: "pending" | "underreview" | "inProgress" | "Resolved" | "Rejected";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
}

const IssuesTable = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Issue | null>(null);

  useEffect(() => {
    axios
      .get("/data/Issuesdata.json")
      .then((res) => {
        setIssues(res.data.issues);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load issues");
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: Issue["status"]) => {
    const colors = {
      pending: "bg-red-100 border-red-300 text-red-800",
      underreview: "bg-yellow-100 border-yellow-300 text-yellow-800",
      inProgress: "bg-orange-100 border-orange-300 text-orange-600",
      Resolved: "bg-blue-100 border-blue-300 text-blue-800",
      Rejected: "bg-purple-100 border-purple-300 text-purple-800",
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority: Issue["priority"]) => {
    const colors = {
      Low: "bg-green-100 border-green-300 text-green-800",
      Medium: "bg-yellow-100 border-yellow-300 text-yellow-800",
      High: "bg-red-100 border-red-300 text-red-800",
    };
    return colors[priority] || colors.Low;
  };

  const handleEdit = (issue: Issue) => {
    setEditForm(issue);
    setEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    if (!editForm) return;
    try {
      // Replace this with actual API call
      await axios.put(`/api/issues/${editForm.id}`, editForm);
      setIssues((prev) =>
        prev.map((issue) => (issue.id === editForm.id ? editForm : issue))
      );
      Swal.fire("Success", "Issue updated successfully", "success");
      setEditModalOpen(false);
    } catch (err) {
      Swal.fire("Error", "Failed to update issue", "error");
    }
  };

  if (loading) return <p className="p-4 text-gray-500">Loading issues...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end p-6 bg-white gap-5 shadow-md rounded-md">
        <div>
          <label>Search</label>
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label>Status</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="underreview">Under Review</option>
            <option value="inProgress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500">
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 w-full text-white rounded-sm flex items-center gap-2 justify-center">
            <FunnelIcon className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>

      <div className="mt-5 bg-white rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {["Title", "Location", "Status", "Priority", "Created At", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {issues.map((issue, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{issue.title}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{issue.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(issue.status)}`}>{issue.status}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(issue.priority)}`}>{issue.priority}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{issue.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEdit(issue)} className="text-yellow-600 hover:text-yellow-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editModalOpen && editForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md w-full max-w-md p-6 relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Issue</h2>
            <div className="space-y-4">
              <input
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded"
                placeholder="Title"
              />
              <input
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded"
                placeholder="Location"
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="underreview">Under Review</option>
                <option value="inProgress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                name="priority"
                value={editForm.priority}
                onChange={handleEditChange}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button
                onClick={handleEditSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesTable;

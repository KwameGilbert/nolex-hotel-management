import { FunnelIcon } from "lucide-react"
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, Pencil, Trash2 } from "lucide-react";

const Complains = () => {

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    axios.get("../../../public/data/complains.json").then((res) => {
      setData(res.data.complaints);
      setFiltered(res.data.complaints);
    });
  }, []);

  const handleFilter = () => {
    const result = data.filter((item) => {
      return (
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase()) ||
          item.complain.toLowerCase().includes(search.toLowerCase())) &&
        (status ? item.status === status : true) &&
        (priority ? item.priority === priority : true)
      );
    });
    setFiltered(result);
  };

  const handleView = (item) => {
    Swal.fire({
      title: item.name,
      html: `
        <p><strong>Email:</strong> ${item.email}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Priority:</strong> ${item.priority}</p>
        <hr />
        <p><strong>Complaint:</strong></p>
        <p>${item.complain}</p>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#2563eb"
    });
  };

  const handleEdit = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Complaint",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${item.name}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${item.email}">
        <textarea id="swal-complain" class="swal2-textarea" placeholder="Complain">${item.complain}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          complain: document.getElementById("swal-complain").value
        };
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#2563eb"
    });

    if (formValues) {
      console.log("Updated values:", formValues);
      Swal.fire("Updated!", "Complaint has been updated.", "success");
      // Optional: Update local state
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: `Delete complaint from ${item.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e02424"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The complaint has been removed.", "success");
        // Optional: remove from local state
        setFiltered((prev) => prev.filter((row) => row.id !== item.id));
        setData((prev) => prev.filter((row) => row.id !== item.id));
      }
    });
  };

  return (
    <div>
       <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Complains Management</h1>
          <p className="text-blue-100">Manage and track Complains</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end p-6 bg-white gap-5 shadow-md rounded-md my-4">
        <div>
          <label>Search</label>
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label>Status</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Priority</label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <button
            className="px-4 py-2 bg-blue-600 w-full text-white rounded-sm flex items-center gap-2 justify-center"
            onClick={handleFilter}
          >
            <FunnelIcon className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Complain</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.complain}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4 flex">
                    <button
                      className="px-1 py-1 text-blue-600  rounded-sm"
                      onClick={() => handleView(item)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="px-1 py-1 rounded-sm"
                      onClick={() => handleEdit(item)}
                    >
                       <Pencil className="w-5 h-5 text-yellow-500" />
                    </button>
                    <button
                      className="px-1 py-1  rounded-sm"
                      onClick={() => handleDelete(item)}
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Complains

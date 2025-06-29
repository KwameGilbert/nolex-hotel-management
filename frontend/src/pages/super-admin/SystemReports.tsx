// src/pages/super-admin/SystemReportsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Report {
  id: string;
  hotelName: string;
  ceoName: string;
  title: string;
  category: string;
  status: string;
  date: string;
  content: string;
}

export default function SystemReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filtered, setFiltered] = useState<Report[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    axios
      .get("../../../public/data/super-admin/systemreports.json")
      .then((res) => {
        setReports(res.data.reports);
        setFiltered(res.data.reports);
      })
      .catch(() => Swal.fire("Error", "Failed to fetch reports", "error"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let data = [...reports];
    if (searchTerm)
      data = data.filter(
        (r) =>
          r.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.ceoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (category) data = data.filter((r) => r.category === category);
    if (status) data = data.filter((r) => r.status === status);
    if (dateFrom) data = data.filter((r) => new Date(r.date) >= new Date(dateFrom));
    if (dateTo) data = data.filter((r) => new Date(r.date) <= new Date(dateTo));
    setFiltered(data);
  }, [searchTerm, category, status, dateFrom, dateTo, reports]);

  const handleStatusUpdate = (report: Report, newStatus: string) => {
    Swal.fire({
      title: `Mark as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = reports.map((r) =>
          r.id === report.id ? { ...r, status: newStatus } : r
        );
        setReports(updated);
        Swal.fire("Updated!", `Report marked as ${newStatus}.`, "success");
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">System Reports</h2>

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Financial">Financial</option>
          <option value="Operational">Operational</option>
          <option value="HR">HR</option>
        </select>
        <select
          className="border px-4 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Resolved">Resolved</option>
        </select>
        <input
          type="date"
          className="border px-4 py-2 rounded"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          className="border px-4 py-2 rounded"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">ID</th>
                <th className="px-4 py-2 whitespace-nowrap">Hotel</th>
                <th className="px-4 py-4 whitespace-nowrap">CEO</th>
                <th className="px-4 py-4 whitespace-nowrap">Title</th>
                <th className="px-4 py-4 whitespace-nowrap">Category</th>
                <th className="px-4 py-4 whitespace-nowrap">Date</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b text-sm">
                  <td className="px-4 py-4 whitespace-nowrap">{r.id}</td>
                  <td className="px-4 py-2">{r.hotelName}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{r.ceoName}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{r.title}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{r.category}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{r.status}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReport(r)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xl">
            <h3 className="text-xl font-semibold mb-2">{selectedReport.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Hotel: <strong>{selectedReport.hotelName}</strong> | CEO: {selectedReport.ceoName}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Category: {selectedReport.category} | Date: {selectedReport.date}
            </p>
            <p className="mb-4 text-gray-700 whitespace-pre-line">
              {selectedReport.content}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => handleStatusUpdate(selectedReport, "Reviewed")}
              >
                Mark as Reviewed
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded"
                onClick={() => handleStatusUpdate(selectedReport, "Resolved")}
              >
                Mark as Resolved
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
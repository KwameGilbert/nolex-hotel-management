import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface CEO {
  id: number;
  name: string;
  email: string;
  phone: string;
  assignedHotels: number;
  status: string;
  created: string;
}

export default function ManageCEOsTable() {
  const [ceos, setCeos] = useState<CEO[]>([]);
  const [filtered, setFiltered] = useState<CEO[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("../../../public/data/super-admin/cedos.json").then((res) => {
      setCeos(res.data.ceos);
      setFiltered(res.data.ceos);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let data = ceos;
    if (search) {
      data = data.filter((ceo) =>
        ceo.name.toLowerCase().includes(search.toLowerCase()) ||
        ceo.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      data = data.filter((ceo) => ceo.status === statusFilter);
    }
    setFiltered(data);
  }, [search, statusFilter, ceos]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Delete this CEO?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCeos((prev) => prev.filter((c) => c.id !== id));
        Swal.fire("Deleted!", "CEO has been removed.", "success");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage CEOs</h2>
      </div>

      {/* Filter/Search */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-5">Name</th>
              <th className="px-4 py-5">Email</th>
              <th className="px-4 py-5">Phone</th>
              <th className="px-4 py-5">Assigned Hotels</th>
              <th className="px-4 py-5">Status</th>
              <th className="px-4 py-5">Created</th>
              <th className="px-4 py-5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ceo) => (
              <tr key={ceo.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-5 font-medium">{ceo.name}</td>
                <td className="px-4 py-5">{ceo.email}</td>
                <td className="px-4 py-5">{ceo.phone}</td>
                <td className="px-4 py-5 text-center">{ceo.assignedHotels}</td>
                <td className="px-4 py-5">
                  <span className={`px-2 py-1 text-xs rounded-full ${ceo.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {ceo.status}
                  </span>
                </td>
                <td className="px-4 py-5">{ceo.created}</td>
                <td className="px-4 py-5 flex gap-2">
                  <button className="text-blue-600" onClick={() => alert("View CEO")}> <Eye className="w-4 h-4" /> </button>
                  <button className="text-yellow-600" onClick={() => alert("Edit CEO")}> <Pencil className="w-4 h-4" /> </button>
                  <button className="text-red-600" onClick={() => handleDelete(ceo.id)}> <Trash2 className="w-4 h-4" /> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

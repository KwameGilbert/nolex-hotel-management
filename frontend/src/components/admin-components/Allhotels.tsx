import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Hotel {
  id: number;
  name: string;
  ceo: string;
  email: string;
  branches: number;
  plan: string;
  status: string;
  registered: string;
}

export default function AllHotelsTable() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filtered, setFiltered] = useState<Hotel[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios.get("../../../public/data/super-admin/allhotel.json").then((res) => {
      setHotels(res.data.hotels);
      setFiltered(res.data.hotels);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filteredData = hotels;
    if (search) {
      filteredData = filteredData.filter(
        (h) =>
          h.name.toLowerCase().includes(search.toLowerCase()) ||
          h.ceo.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (planFilter) {
      filteredData = filteredData.filter((h) => h.plan === planFilter);
    }
    if (statusFilter) {
      filteredData = filteredData.filter((h) => h.status === statusFilter);
    }
    setFiltered(filteredData);
  }, [search, planFilter, statusFilter, hotels]);

  const handleDelete = (hotelId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This hotel will be removed from the system.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
        Swal.fire("Deleted!", "Hotel has been deleted.", "success");
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
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hotels Management</h1>
          <p className="text-blue-100">Manage and track all hotels</p>
        </div>

        <div>
          <Link to='add-new-hotel' className="flex items-center gap-2 mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium">
            <Plus className="w-6 h-6" />
            Add New Hotel
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">All Hotels</h2>

        {/* Filter/Search Bar */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-8">
          <input
            type="search"
            placeholder="Search by name or CEO..."
            className="border px-3 py-2 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded-md"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="">All Plans</option>
            <option value="Free">Free</option>
            <option value="Premium">Premium</option>
          </select>
          <select
            className="border px-3 py-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
                <th className="px-4 py-5">CEO</th>
                <th className="px-4 py-5">Email</th>
                <th className="px-4 py-5">Branches</th>
                <th className="px-4 py-5">Plan</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-4 py-5">Registered</th>
                <th className="px-4 py-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((hotel) => (
                <tr key={hotel.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-5 font-medium">{hotel.name}</td>
                  <td className="px-4 py-5">{hotel.ceo}</td>
                  <td className="px-4 py-5">{hotel.email}</td>
                  <td className="px-4 py-5 text-center">{hotel.branches}</td>
                  <td className="px-4 py-5">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        hotel.plan === "Premium"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {hotel.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        hotel.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-4 py-5">{hotel.registered}</td>
                  <td className="px-6 py-5 flex gap-2">
                    <button
                      className="text-blue-600"
                      onClick={() => alert("View hotel")}
                    >
                      {" "}
                      <Eye className="w-4 h-4" />{" "}
                    </button>
                    <button
                      className="text-yellow-600"
                      onClick={() => alert("Edit hotel")}
                    >
                      {" "}
                      <Pencil className="w-4 h-4" />{" "}
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      {" "}
                      <Trash2 className="w-4 h-4" />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

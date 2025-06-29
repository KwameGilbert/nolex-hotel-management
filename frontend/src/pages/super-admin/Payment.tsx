
// src/pages/super-admin/PaymentsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Payment {
  id: string;
  hotelName: string;
  ceoName: string;
  email: string;
  plan: string;
  amount: number;
  method: string;
  transactionId: string;
  date: string;
  status: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    axios
      .get("../../../public/data/super-admin/payment.json")
      .then((res) => setPayments(res.data))
      .catch(() => Swal.fire("Error", "Failed to fetch payment records", "error"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPayments = payments
    .filter((p) => {
      const termMatch = [p.hotelName, p.ceoName, p.email].some((field) =>
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const fromMatch = dateFrom ? new Date(p.date) >= new Date(dateFrom) : true;
      const toMatch = dateTo ? new Date(p.date) <= new Date(dateTo) : true;
      return termMatch && fromMatch && toMatch;
    })
    .sort((a, b) => {
      if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>

      <div className="flex flex-wrap gap-4 mb-4 bg-white p-6 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Search by Hotel, CEO, or Email"
          className="px-4 py-4 border rounded w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-4 border rounded"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-4 border rounded"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-4 border rounded"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading payment records...</p>
      ) : filteredPayments.length === 0 ? (
        <p className="text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-md shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-4 text-left whitespace-nowrap">Hotel</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Email</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">CEO</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Plan</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Amount</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Method</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Txn ID</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Date</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Status</th>
                <th className="px-4 py-4 text-left whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b text-[13px]">
                  <td className="px-4 py-4 whitespace-nowrap">{payment.hotelName}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.ceoName}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.plan}</td>
                  <td className="px-4 py-4 whitespace-nowrap">₵{payment.amount.toLocaleString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.method}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.transactionId}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-xl text-[8px] font-medium text-white ${
                        payment.status === "Successful"
                          ? "bg-green-500"
                          : payment.status === "Pending"
                          ? "bg-yellow-300"
                          : "bg-red-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => Swal.fire("Receipt", `Transaction: ${payment.transactionId}`, "info")}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

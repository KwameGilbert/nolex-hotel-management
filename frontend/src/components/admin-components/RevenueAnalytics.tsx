import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const pieColors = ["#339af0", "#845ef7", "#51cf66", "#ffa94d"];

export default function RevenueAnalytics() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [revenueBySource, setRevenueBySource] = useState([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    axios
      .get("../../../public/data/super-admin/monthlyrevenue.json")
      .then((res) => setMonthlyRevenue(res.data.monthlyRevenue));
    axios
      .get("../../../public/data/super-admin/revenuesource.json")
      .then((res) => setRevenueBySource(res.data.revenueBySource));
    axios
      .get("../../../public/data/super-admin/subcription.json")
      .then((res) => setSubscriptionPlans(res.data.plans));
  }, []);

  return (
    <div className="mb-10 mt-5 flex flex-col gap-6">
      {/* Line Chart: Monthly Revenue */}
      <div className="bg-white p-4 rounded-md shadow-md col-span-2">
        <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid stroke="#f1f5f9" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue by Source</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueBySource}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {revenueBySource.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Subscription Usage */}
        <div className="bg-white p-4 rounded-md shadow-md col-span-1">
          <h2 className="text-lg font-semibold mb-4">Subscription Usage</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subscriptionPlans}>
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hotels" fill="#22c55e" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Pie Chart: Revenue by Source */}
    </div>
  );
}

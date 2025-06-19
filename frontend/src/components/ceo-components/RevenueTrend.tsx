import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

interface RevenueData {
  month: string;
  total: number;
  rooms: number;
  food: number;
  events: number;
}

const RevenueTrend = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get("../../../public/data/RevenueData.json");
        setMonthlyRevenue(res.data.revenuedata);
        setLoading(false);
      } catch (err) {
        setError("Failed to load revenue data.");
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading chart...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardDescription>Monthly revenue breakdown by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`]}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#22DD9FFF"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="rooms"
              stroke="#2247DDFF"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="food"
              stroke="#DDDD22FF"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="events"
              stroke="#DD2222FF"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueTrend;

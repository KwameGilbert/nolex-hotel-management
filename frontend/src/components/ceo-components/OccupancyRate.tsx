import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface OccupancyData {
  day: string;
  occupancy: number;
  capacity: number;
}

export function OccupancyChart() {
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOccupancy = async () => {
      try {
        const response = await axios.get("../../../public/data/OccupancyData.json");
        setOccupancyData(response.data.occupancyData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load occupancy data.");
        setLoading(false);
      }
    };

    fetchOccupancy();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading chart...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card className="border-0 shadow-sm rounded-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">Weekly Occupancy</CardTitle>
        <p className="text-sm text-gray-500">Room occupancy by day</p>
      </CardHeader>
      <CardContent>
        <div className="h-70">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={occupancyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Occupancy Rate"]}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="occupancy"
                fill="#22DD9FFF"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface SourceData {
  name: string;
  value: number;
  amount: number;
  color: string;
}

const RevenueSourceStat = () => {
  const [revenueBySource, setRevenueBySource] = useState<SourceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("../../../public/data/RevenueSources.json");
        setRevenueBySource(res.data.revenueBySource);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Revenue Sources</CardTitle>
        <CardDescription>Distribution of revenue streams</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={253}>
          <PieChart>
            <Pie
              data={revenueBySource}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {revenueBySource.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}%`]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-col">
          {revenueBySource.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>
              <span className="font-medium">
                ${(item.amount / 1000000).toFixed(1)}M
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueSourceStat;

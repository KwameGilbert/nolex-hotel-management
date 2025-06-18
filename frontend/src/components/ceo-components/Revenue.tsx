import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface RevenueData {
  month: string;
  revenue: number;
  target: number;
}

export function RevenueChart() {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get('../../../public/data/RevenueChart.json');  
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load revenue data');
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading chart...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            formatter={(value, name) => [
              `$${Number(value).toLocaleString()}`,
              name === 'revenue' ? 'Actual Revenue' : 'Target'
            ]}
            labelStyle={{ color: '#1e293b' }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar 
            dataKey="revenue" 
            fill="#a020f0"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="target" 
            fill="#CB8BF3FF"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

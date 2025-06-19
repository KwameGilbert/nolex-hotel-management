import { DollarSign, HouseIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStat {
  title: string;
  value: string;
  change: string;
  description: string;
}
interface ApiResponse {
  status: string;
  data: DashboardStat[];
  message: string;
}


const iconMap: Record<string, JSX.Element> = {
  "Total Revenue": (
    <div className="bg-blue-100 p-2 rounded-sm">
      <DollarSign className="w-5 h-5 text-blue-600" />
    </div>
  ),
  "Total Branches": (
    <div className="bg-green-100 p-2 rounded-sm">
      <HouseIcon className="w-5 h-5 text-green-600" />
    </div>
  ),
  "Total Customers": (
    <div className="bg-yellow-100 p-2 rounded-sm">
      <Users className="w-5 h-5 text-yellow-500" />
    </div>
  ),
  "Total Employees": (
    <div className="bg-purple-100 p-2 rounded-sm">
      <HouseIcon className="w-5 h-5 text-purple-600" />
    </div>
  ),

}

const borderColorMap: Record<string, string> = {
  "Total Revenue": "border-t-4 border-blue-600",
  "Total Branches": "border-t-4 border-green-600",
  "Total Customers": "border-t-4 border-yellow-500",
  "Total Employees": "border-t-4 border-purple-600",
}

const CeoDashboardStat = () => {

  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "../../../public/data/DashboardStat.json"
        );
        setStats(res.data.stat);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard stats");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500 p-4">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;
  return (
    <div>
       <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`bg-white rounded-lg shadow p-4 flex items-center justify-between ${borderColorMap[stat.title]}`}
          >
           
            <div className="flex flex-col gap-1">
              <p className="text-slate-900 text-lg font-medium">{stat.title}</p>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-green-500 text-sm">{stat.change}</p>
            </div>
            <div className="mr-4">{iconMap[stat.title]}</div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default CeoDashboardStat;

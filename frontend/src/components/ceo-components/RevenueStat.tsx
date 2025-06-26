import { DollarSignIcon, Bed, HousePlugIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"


interface RevenueStat{
title: string;
value: number;
description: string
}

interface ApiResponse {
  status: string;
  data: RevenueStat[];
  message: string;
}

const iconMap: Record<string, JSX.Element> ={
  "Total Revenue": (
    <div className="bg-blue-200 p-2 rounded-sm">
      <DollarSignIcon className="w-5 h-5 text-blue-600" />
    </div>
  ),
  "Average Revenue": (
    <div className="bg-green-200 p-2 rounded-sm">
      <Bed className="w-5 h-5 text-green-600" />
    </div>
  ),
  "F&B Revenue": (
    <div className="bg-amber-200 p-2 rounded-sm">
      <DollarSignIcon className="w-5 h-5 text-amber-600"/>
    </div>
  ),
  "Events Revenue":(
    <div className="bg-purple-200 p-2 rounded-sm">
      <HousePlugIcon className="w-5 h-5 text-purple-600"/>
    </div>
  )
}

const borderColorMap: Record<string, string> ={
  "Today's Revenue" : "border-t-4 border-blue-600",
  "Average Revenue": "border-t-4 border-green-600",
  "Total Revenue": "border-t-4 border-amber-500",
  "Weekly Booking Revenue": "border-t-4 border-purple-600"
}
const RevenueStat = () => {
  const [stats, setStats] = useState<RevenueStat[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string |null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "../../../public/data/RevenueStat.json"
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
        <div key={stat.title} 
        className={`bg-white rounded-lg shadow p-4 justify-between ${borderColorMap[stat.title]}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="ml-2 text-lg font-semibold text-gray-800">{stat.title}</h3>
            {iconMap[stat.title]}
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-2">
            <span>&#8373;</span>
          {stat.value}</p>
          <p className="text-green-400 text-[12px]">{stat.description}</p>
        </div>
      ))}
     </div>
    </div>
  )
}

export default RevenueStat

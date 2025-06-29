import { Building, UserCircle, BedDouble, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const iconMap : Record<string, JSX.Element> = {
  "Total Hotels": (
    <div className="bg-blue-100 p-2 rounded-sm">
      <Building className="w-5 h-5 text-blue-600" />
    </div>
  ),
  "Total CEOs": (
    <div className="bg-green-100 p-2 rounded-sm">
      <UserCircle className="w-5 h-5 text-green-600" />
    </div>
  ),
  "Total Branches": (
    <div className="bg-yellow-100 p-2 rounded-sm">
      <BedDouble className="w-5 h-5 text-yellow-500" />
    </div>
  ),
  "Total Revenue": (
    <div className="bg-purple-100 p-2 rounded-sm">
      <CreditCard className="w-5 h-5 text-purple-600" />
    </div>
  ),
};

interface DashboardCard {
  title: string;
  value: string;
  description: string;
}

interface ApiResponse {
  data: DashboardCard[];
}

const DashboardCards = () => {
  const [cards, setCards] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get<ApiResponse>(
          "../../../public/data/super-admin/dashboardcards.json"
        );
        setCards(res.data.stats);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard cards");
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <p className="text-gray-500 p-4">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div 
          key={card.title}
          className="bg-white rounded-md border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">
                {card.title}
              </h3>
              {iconMap[card.title]}
            </div>

            <h1 className="text-2xl font-semibold">{card.value}</h1>
            <p className="text-xs text-green-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;

import { Clock, Globe, Star, Users } from "lucide-react";

const StatSection = () => {

  const stats = [
    { number: '50K+', label: 'Happy Guests', icon: Users },
    { number: '4.9★', label: 'Guest Rating', icon: Star },
    { number: '24/7', label: 'Concierge', icon: Clock },
    { number: '15+', label: 'Languages', icon: Globe }
  ];


  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-14 h-14 bg-[#C9A55C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C9A55C] transition-colors">
                <stat.icon className="w-6 h-6 text-[#C9A55C] group-hover:text-white transition-colors" />
              </div>
              <div className="text-2xl font-bold text-[#1A365D] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatSection;

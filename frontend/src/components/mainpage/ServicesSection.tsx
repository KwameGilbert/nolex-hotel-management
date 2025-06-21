import { Card, CardContent } from "../ui/card";
import { Wifi, Car, Utensils, Sparkles, Dumbbell, Shield } from "lucide-react";

const ServicesSection = () => {
  return (
    <div className="py-10 bg-gray-100 px-4">
      <div className="flex flex-col gap-5 items-center justify-center">
        <button className="bg-[#ffe2a9] text-[#1A365D] text-sm font-bold uppercase px-4 py-2 rounded-full">
          World Class Amenities
        </button>
        <h1 className="text-3xl md:text-5xl font-bold text-[#1A365D] ml-4">
          Exceptional Services
        </h1>
        <p className="text-gray-600 text-sm text-center md:text-xl mt-4 max-w-3xl mx-auto">
          Indulge in our comprehensive collection of premium amenities designed
          to exceed your every expectation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 max-w-[68rem] mx-auto">
      {services.map((service, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-md bg-white">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 ${service.color} rounded-md flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[#1A365D]">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default ServicesSection;


const services = [
  { 
    icon: Wifi, 
    title: 'Complimentary WiFi', 
    description: 'High-speed fiber internet throughout the property',
    color: 'bg-blue-100 text-blue-600'
  },
  { 
    icon: Car, 
    title: 'Luxury Valet Service', 
    description: 'Premium vehicle care and parking assistance',
    color: 'bg-green-100 text-green-600'
  },
  { 
    icon: Utensils, 
    title: '24/7 Room Service', 
    description: 'Gourmet dining delivered to your door',
    color: 'bg-orange-100 text-orange-600'
  },
  { 
    icon: Sparkles, 
    title: 'World-Class Spa', 
    description: 'Rejuvenating treatments and wellness facilities',
    color: 'bg-purple-100 text-purple-600'
  },
  { 
    icon: Dumbbell, 
    title: 'Fitness Center', 
    description: 'State-of-the-art equipment and personal training',
    color: 'bg-red-100 text-red-600'
  },
  { 
    icon: Shield, 
    title: 'Concierge Services', 
    description: 'Personalized assistance for all your needs',
    color: 'bg-indigo-100 text-indigo-600'
  }
];

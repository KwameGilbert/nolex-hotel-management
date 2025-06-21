import Footer from "../../components/mainpage/Footer";
import Navbar from "../../components/mainpage/Navbar";
import { Award } from "lucide-react";
import Awards from "../../components/mainpage/Awards";
import ServicesSection from "../../components/mainpage/ServicesSection";
import ServiceCategory from "../../components/mainpage/ServiceCategory";

const Service = () => {
  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-[66vh]"
        style={{
          backgroundImage: ` linear-gradient(rgba(26, 54, 93, 0.5), rgba(26, 54, 93, 0.6)), url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200)
  `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-[#C9A55C] text-white mb-6 px-4 py-2 text-sm flex items-center rounded-2xl font-medium">
          <Award size={16} className="mr-2" />
          Premium Services & Amenities
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white">Exceptional</h1>
        <h1 className="text-4xl md:text-6xl font-bold text-[#C9A55C]">Experiences</h1>
        <p className="text-gray-200 text-sm text-center md:text-lg mt-4">
          Discover our world-class services and amenities designed to make your
          stay unforgettable
        </p>
      </div>
      <ServicesSection/>
      <Awards/>
      <ServiceCategory/>
      <Footer />
    </div>
  );
};

export default Service;

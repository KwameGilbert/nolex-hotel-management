import Footer from "../../components/mainpage/Footer";
import Navbar from "../../components/mainpage/Navbar";
import RoomsContainer from "../../components/mainpage/RoomsContainer";

const Rooms = () => {
  return (
    <div>
      <Navbar />
      {/* hero section */}
      <div
        className="flex flex-col items-center justify-center h-[75vh] md:h-[69vh]"
        style={{backgroundImage: ` linear-gradient(rgba(26, 54, 93, 0.7), rgba(26, 54, 93, 0.7)), url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200)
  `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">Luxury Accommodations</h1>
        <p className="text-gray-200 text-sm text-center md:text-lg mt-4 max-w-2xl mx-auto">Discover your perfect sanctuary from our collection of meticulously designed rooms and suites</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-40 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9A55C]">5</div>
              <div className="text-md text-gray-300">Room Types</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9A55C]">4.8★</div>
              <div className="text-md text-gray-300">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9A55C]">24/7</div>
              <div className="text-md text-gray-300">Concierge</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#C9A55C]">1.2K+</div>
              <div className="text-md text-gray-300">Happy Guests</div>
            </div>
          </div>
      </div>
      <RoomsContainer/>
      <Footer />
    </div>
  );
};

export default Rooms;


const Explore = () => {
  return (
    <div className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#1A365D] mb-4">
            Experience Our Hotel Virtually
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take an immersive 360° tour of our luxurious facilities and imagine
            yourself in the comfort of our spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Elegant%20hotel%20deluxe%20room%20with%20king-sized%20bed%2C%20premium%20white%20linens%2C%20modern%20furniture%20in%20neutral%20tones%2C%20floor-to-ceiling%20windows%20with%20city%20views%2C%20ambient%20lighting%2C%20and%20minimalist%20decor%20creating%20a%20sophisticated%20atmosphere&width=600&height=400&seq=4&orientation=landscape"
              alt="Hotel lobby virtual tour"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <button className="bg-white bg-opacity-90 text-[#1A365D] w-20 h-20 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-play text-2xl"></i>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-[#1A365D]">
              Explore Every Corner
            </h3>
            <p className="text-gray-600">
              Our virtual tour allows you to navigate through our hotel's most
              stunning spaces at your own pace. Discover the elegance of our
              lobby, the comfort of our rooms, the exquisite dining areas, and
              our world-class amenities.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Lobby", icon: "fa-concierge-bell" },
                { name: "Rooms", icon: "fa-bed" },
                { name: "Restaurants", icon: "fa-utensils" },
                { name: "Spa", icon: "fa-spa" },
                { name: "Pool", icon: "fa-swimming-pool" },
                { name: "Fitness Center", icon: "fa-dumbbell" },
              ].map((area, index) => (
                <div
                  key={index}
                  className="bg-[#F5F5F5] p-4 text-center cursor-pointer hover:bg-[#E0E0E0] transition-colors duration-300"
                >
                  <i
                    className={`fas ${area.icon} text-[#C9A55C] text-2xl mb-2`}
                  ></i>
                  <p className="text-sm text-[#1A365D]">{area.name}</p>
                </div>
              ))}
            </div>

            <button className="bg-[#1A365D] text-white px-6 py-3 mt-4 hover:bg-opacity-90 transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
              Start Full Virtual Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;

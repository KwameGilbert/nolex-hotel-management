const Accomdations = () => {
  return (
    <div className="py-16  px-10 bg-[#F5F5F5]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-[#1A365D] mb-4">
          Luxurious Accommodations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our exquisite collection of rooms and suites, each designed
          to provide the ultimate comfort and elegance for your stay.
        </p>
      </div>
      
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 max-w-[68rem] mx-auto">
            {rooms.map((room) => (
          <div  key={room.title} className="shadow-lg bg-white">
            <div className="relative overflow-hidden h-56">
              <img
                src={room.image}
                alt="Accommodation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-md font-serif text-[#1A365D]">
                  {room.title}
                </h3>
                <p className="text-[#C9A55C] font-medium text-sm">
                  from {room.price}/night
                </p>
              </div>
              <p className="text-gray-600 mb-4 text-[12px]">
                {room.description}
              </p>
              <div className="flex space-x-4">
                <button className="border border-[#1A365D] text-[#1A365D] px-4 py-1 hover:bg-[#1A365D] hover:text-white transition-colors duration-300 flex-1 cursor-pointer whitespace-nowrap">
                  View Details
                </button>
                <button className="bg-[#C9A55C] text-white px-4 py-1 hover:bg-[#B89448] transition-colors duration-300 flex-1 cursor-pointer !rounded-button whitespace-nowrap">
                  Book Now
                </button>
              </div>
            </div>
          </div>
           ))}
        </div>
     
    </div>
  );
};

export default Accomdations;

const rooms = [
  {
    title: "Deluxe Room",
    description: "Spacious comfort with modern amenities and city views",
    price: "$299",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20deluxe%20room%20with%20king-sized%20bed%2C%20premium%20white%20linens%2C%20modern%20furniture%20in%20neutral%20tones%2C%20floor-to-ceiling%20windows%20with%20city%20views%2C%20ambient%20lighting%2C%20and%20minimalist%20decor%20creating%20a%20sophisticated%20atmosphere&width=600&height=400&seq=4&orientation=landscape",
  },
  {
    title: "Executive Suite",
    description:
      "Refined luxury with separate living area and premium amenities",
    price: "$499",
    image:
      "https://readdy.ai/api/search-image?query=Luxurious%20hotel%20executive%20suite%20with%20separate%20bedroom%20and%20living%20area%2C%20featuring%20elegant%20furniture%2C%20marble%20bathroom%2C%20floor-to-ceiling%20windows%20with%20panoramic%20views%2C%20sophisticated%20neutral%20color%20palette%2C%20and%20premium%20amenities%20creating%20an%20atmosphere%20of%20refined%20luxury&width=600&height=400&seq=5&orientation=landscape",
  },
  {
    title: "Ocean View Suite",
    description:
      "Breathtaking ocean views with spacious terrace and premium furnishings",
    price: "$699",
    image:
      "https://readdy.ai/api/search-image?query=Stunning%20hotel%20ocean%20view%20suite%20with%20panoramic%20windows%20framing%20turquoise%20waters%2C%20elegant%20king%20bed%20with%20premium%20linens%2C%20contemporary%20furniture%20in%20light%20colors%2C%20private%20balcony%20with%20lounge%20chairs%2C%20and%20sophisticated%20decor%20creating%20a%20serene%20luxury%20atmosphere&width=600&height=400&seq=6&orientation=landscape",
  },
  {
    title: "Family Room",
    description:
      "Comfortable space designed for family stays with connecting rooms",
    price: "$399",
    image:
      "https://readdy.ai/api/search-image?query=Spacious%20hotel%20family%20room%20with%20two%20queen%20beds%20with%20premium%20linens%2C%20comfortable%20seating%20area%2C%20large%20windows%20with%20natural%20light%2C%20neutral%20color%20palette%20with%20colorful%20accents%2C%20and%20thoughtful%20amenities%20designed%20for%20family%20comfort%20in%20an%20elegant%20setting&width=600&height=400&seq=7&orientation=landscape",
  },
  {
    title: "Presidential Suite",
    description:
      "The pinnacle of luxury with panoramic views and exclusive services",
    price: "$1,299",
    image:
      "https://readdy.ai/api/search-image?query=Opulent%20hotel%20presidential%20suite%20with%20expansive%20living%20room%20featuring%20designer%20furniture%2C%20floor-to-ceiling%20windows%20with%20panoramic%20views%2C%20dining%20area%2C%20luxury%20bar%2C%20sophisticated%20lighting%2C%20premium%20materials%2C%20and%20exclusive%20design%20elements%20creating%20the%20ultimate%20luxury%20experience&width=600&height=400&seq=8&orientation=landscape",
  },
  {
    title: "Garden Terrace Room",
    description:
      "Serene garden views with private terrace and natural ambiance",
    price: "$349",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20garden%20terrace%20room%20with%20king%20bed%2C%20premium%20linens%2C%20large%20glass%20doors%20opening%20to%20private%20terrace%20with%20lush%20garden%20views%2C%20natural%20materials%2C%20soft%20neutral%20palette%2C%20comfortable%20seating%2C%20and%20refined%20decor%20creating%20a%20peaceful%20retreat%20atmosphere&width=600&height=400&seq=9&orientation=landscape",
  },
  
];

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gallery = () => {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#1A365D] mb-4">
            Captivating Moments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our gallery to experience the beauty and elegance of
            our hotel.
          </p>
        </div>

        <div className="flex justify-center mb-8 max-w-6xl mx-auto">
          <div className="px-4">
            <Tabs defaultValue="all" className="">
              <TabsList className="max-w-5xl md:max-w-6xl mx-auto inline-flex bg-[#F5F5F5] p-1 rounded-sm h-12 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="dining">Dining</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "https://readdy.ai/api/search-image?query=Elegant%20hotel%20suite%20bedroom%20with%20king%20bed%2C%20premium%20linens%2C%20sophisticated%20lighting%2C%20and%20panoramic%20city%20views%20through%20floor-to-ceiling%20windows%2C%20creating%20a%20luxurious%20atmosphere%20with%20neutral%20color%20palette&width=600&height=600&seq=17&orientation=squarish",
              "https://readdy.ai/api/search-image?query=Luxurious%20hotel%20bathroom%20with%20marble%20surfaces%2C%20freestanding%20bathtub%2C%20glass%20shower%2C%20premium%20fixtures%2C%20and%20elegant%20lighting%20creating%20a%20spa-like%20atmosphere%20of%20refined%20luxury%20and%20comfort&width=600&height=800&seq=18&orientation=portrait",
              "https://readdy.ai/api/search-image?query=Sophisticated%20hotel%20bar%20with%20backlit%20shelves%20of%20premium%20spirits%2C%20elegant%20seating%2C%20ambient%20lighting%2C%20and%20professional%20bartenders%20creating%20craft%20cocktails%20in%20an%20atmosphere%20of%20refined%20luxury&width=800&height=600&seq=19&orientation=landscape",
              "https://readdy.ai/api/search-image?query=Elegant%20hotel%20indoor%20pool%20with%20ambient%20lighting%2C%20loungers%20with%20white%20towels%2C%20architectural%20ceiling%20features%2C%20and%20floor-to-ceiling%20windows%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20relaxation&width=600&height=600&seq=20&orientation=squarish",
              "https://readdy.ai/api/search-image?query=Luxurious%20hotel%20spa%20treatment%20room%20with%20massage%20table%2C%20premium%20linens%2C%20natural%20elements%2C%20soft%20lighting%2C%20and%20minimalist%20decor%20creating%20a%20tranquil%20atmosphere%20of%20wellness%20and%20indulgence&width=600&height=800&seq=21&orientation=portrait",
              "https://readdy.ai/api/search-image?query=Elegant%20hotel%20terrace%20with%20comfortable%20seating%2C%20ambient%20lighting%2C%20panoramic%20views%2C%20and%20sophisticated%20design%20elements%20creating%20an%20exclusive%20outdoor%20relaxation%20space%20of%20refined%20luxury&width=800&height=600&seq=22&orientation=landscape",
              "https://readdy.ai/api/search-image?query=Sophisticated%20hotel%20lobby%20lounge%20with%20elegant%20furniture%2C%20ambient%20lighting%2C%20architectural%20features%2C%20and%20attentive%20service%20creating%20a%20welcoming%20atmosphere%20of%20luxury%20and%20comfort&width=600&height=600&seq=23&orientation=squarish",
              "https://readdy.ai/api/search-image?query=Luxurious%20hotel%20dining%20table%20with%20elegant%20place%20settings%2C%20fresh%20flowers%2C%20ambient%20lighting%2C%20and%20panoramic%20views%20creating%20an%20atmosphere%20of%20culinary%20excellence%20and%20sophisticated%20dining&width=600&height=800&seq=24&orientation=portrait",
            ].map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer overflow-hidden ${
                  index === 1 || index === 4 || index === 7 ? "row-span-2" : ""
                } ${index === 2 || index === 5 ? "col-span-2" : ""}`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
              </TabsContent>
              <TabsContent value="rooms">
                rooms content here
              </TabsContent>
              <TabsContent value="dining">
                dining content here
              </TabsContent>
              <TabsContent value="facilities">
                facilities content here
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

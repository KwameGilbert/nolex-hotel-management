import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Utensils, Dumbbell, Umbrella, Martini, WavesLadder, Spade } from "lucide-react";

const ICON_MAP: any = {
  WavesLadder,
  Spade,
  Utensils,
  Dumbbell,
  Umbrella,
  Martini,
};

export default function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 px-4 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#1A365D] mb-4">
            Exceptional Amenities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Indulge in our world-class facilities designed to provide the
            ultimate luxury experience during your stay.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            navigation
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {amenities.map((amenity: any, index: number) => {
              const Icon = ICON_MAP[amenity.icon] || null;
              return (
                <SwiperSlide key={index}>
                  <div className="bg-white shadow-lg h-full">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {Icon && (
                        <div className="absolute top-4 left-4 bg-[#1A365D] text-white w-10 h-10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-[#1A365D] mb-2">
                        {amenity.title}
                      </h3>
                      <p className="text-gray-600">{amenity.description}</p>
                      <button className="mt-4 text-[#C9A55C] hover:text-[#B89448] transition-colors duration-300 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
                        Learn more <i className="fas fa-arrow-right ml-2"></i>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

const amenities = [
  {
    title: "Infinity Pool",
    description:
      "Our stunning infinity pool offers breathtaking views and a serene environment for relaxation.",
    icon: "SwimmingPool",
    image:
      "https://readdy.ai/api/search-image?query=Luxurious%20hotel%20infinity%20pool%20overlooking%20ocean%20at%20sunset%2C%20with%20elegant%20lounge%20chairs%2C%20palm%20trees%2C%20and%20ambient%20lighting.%20The%20water%20seamlessly%20blends%20with%20horizon%2C%20creating%20an%20atmosphere%20of%20exclusive%20tranquility%20in%20a%20sophisticated%20setting&width=600&height=400&seq=11&orientation=landscape",
  },
  {
    title: "Spa & Wellness",
    description:
      "Rejuvenate your body and mind with our comprehensive spa treatments and wellness programs.",
    icon: "Spa",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20spa%20with%20treatment%20rooms%20featuring%20natural%20materials%2C%20soft%20lighting%2C%20premium%20massage%20tables%20with%20white%20linens%2C%20subtle%20aromatherapy%20elements%2C%20and%20minimalist%20decor%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20tranquility&width=600&height=400&seq=12&orientation=landscape",
  },
  {
    title: "Fine Dining",
    description:
      "Experience culinary excellence with our award-winning chefs and exquisite menu selections.",
    icon: "Utensils",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20spa%20with%20treatment%20rooms%20featuring%20natural%20materials%2C%20soft%20lighting%2C%20premium%20massage%20tables%20with%20white%20linens%2C%20subtle%20aromatherapy%20elements%2C%20and%20minimalist%20decor%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20tranquility&width=600&height=400&seq=12&orientation=landscape",
  },
  {
    title: "Fitness Center",
    description:
      "Stay active in our state-of-the-art fitness center featuring premium equipment and personal trainers.",
    icon: "Dumbbell",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20spa%20with%20treatment%20rooms%20featuring%20natural%20materials%2C%20soft%20lighting%2C%20premium%20massage%20tables%20with%20white%20linens%2C%20subtle%20aromatherapy%20elements%2C%20and%20minimalist%20decor%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20tranquility&width=600&height=400&seq=12&orientation=landscape",
  },
  {
    title: "Private Beach",
    description:
      "Enjoy exclusive access to our pristine private beach with premium loungers and attentive service.",
    icon: "Umbrella",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20spa%20with%20treatment%20rooms%20featuring%20natural%20materials%2C%20soft%20lighting%2C%20premium%20massage%20tables%20with%20white%20linens%2C%20subtle%20aromatherapy%20elements%2C%20and%20minimalist%20decor%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20tranquility&width=600&height=400&seq=12&orientation=landscape",
  },
  {
    title: "Executive Lounge",
    description:
      "Access our exclusive lounge offering premium services, refreshments, and a sophisticated atmosphere.",
    icon: "Martini",
    image:
      "https://readdy.ai/api/search-image?query=Elegant%20hotel%20spa%20with%20treatment%20rooms%20featuring%20natural%20materials%2C%20soft%20lighting%2C%20premium%20massage%20tables%20with%20white%20linens%2C%20subtle%20aromatherapy%20elements%2C%20and%20minimalist%20decor%20creating%20a%20serene%20atmosphere%20of%20luxury%20and%20tranquility&width=600&height=400&seq=12&orientation=landscape",
  },
];

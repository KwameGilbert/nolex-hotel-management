import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="text-center mb-16">
        <button>GUEST EXPERIENCES</button>
        <h2 className="text-4xl font-serif text-[#1A365D] mb-4 font-medium">
        What Our Guests Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
        Read authentic reviews from our valued guests
        </p>
      </div>
      <div className="max-w-6xl mx-auto py-5">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
                <div className="flex items-center mt-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <i
                      key={index}
                      className="fas fa-star text-yellow-500"
                    ></i>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">{testimonial.date}</p>
              </div>
            </SwiperSlide>
                ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;


const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment: "Absolutely stunning hotel with exceptional service. The ocean view from our suite was breathtaking!",
    image: "/placeholder.svg?height=60&width=60",
    date: "2 weeks ago",
  },
  {
    name: "Michael Chen",
    location: "Tokyo, Japan",
    rating: 5,
    comment: "Perfect location and amazing amenities. The spa was incredibly relaxing after a long day of meetings.",
    image: "/placeholder.svg?height=60&width=60",
    date: "1 month ago",
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    rating: 5,
    comment:
      "The staff went above and beyond to make our anniversary special. Highly recommend the presidential suite!",
    image: "/placeholder.svg?height=60&width=60",
    date: "3 weeks ago",
  },
  {
    name: "John Doe",
    location: "San Francisco, USA",
    rating: 4,
    comment: "The hotel was clean and well-maintained, and the staff were friendly and accommodating.",
    image: "/placeholder.svg?height=60&width=60",
    date: "1 month ago",
  },
]

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomeHero() {
  const slides = [
    {
      id: 1,
      img: 'https://readdy.ai/api/search-image?query=Luxurious%20hotel%20suite%20with%20panoramic%20city%20views%2C%20featuring%20a%20king-sized%20bed%20with%20premium%20white%20linens%2C%20elegant%20modern%20furniture%2C%20soft%20ambient%20lighting%2C%20and%20floor-to-ceiling%20windows%20showcasing%20a%20stunning%20cityscape%20at%20dusk%20with%20twinkling%20lights&width=1920&height=1080&seq=1&orientation=landscape',
      title: 'Experience Unparalleled Luxury',
      subtitle: 'Where elegance meets comfort in the heart of paradise',
      buttonText: 'Book Your Stay',
    },
    {
      id: 2,
      img: 'https://readdy.ai/api/search-image?query=Elegant%20hotel%20infinity%20pool%20overlooking%20ocean%20at%20sunset%2C%20with%20lounge%20chairs%2C%20palm%20trees%2C%20and%20ambient%20lighting%20creating%20a%20luxurious%20atmosphere.%20The%20water%20reflects%20golden%20sky%20colors%2C%20creating%20a%20seamless%20blend%20with%20the%20horizon&width=1920&height=1080&seq=2&orientation=landscape',
      title: 'Immerse in Tranquility',
      subtitle: 'Discover our world-class amenities designed for your ultimate relaxation',
      buttonText: 'Explore Amenities',
    },
    {
      id: 3,
      img: 'https://readdy.ai/api/search-image?query=Luxurious%20hotel%20restaurant%20with%20elegant%20table%20settings%2C%20soft%20lighting%20from%20crystal%20chandeliers%2C%20panoramic%20windows%20with%20ocean%20views%2C%20professional%20waitstaff%2C%20and%20sophisticated%20diners%20enjoying%20gourmet%20meals%20in%20an%20atmosphere%20of%20refined%20luxury&width=1920&height=1080&seq=3&orientation=landscape',
      title: 'Culinary Excellence',
      subtitle: 'Indulge in exquisite dining experiences crafted by world-renowned chefs',
      buttonText: 'View Dining Options',
    },
  ];

  return (
    <section className="relative h-[90vh] w-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        navigation
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
                  {slide.subtitle}
                </p>
                <button className="bg-[#C9A55C] text-white px-8 py-3 text-lg hover:bg-[#B89448] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

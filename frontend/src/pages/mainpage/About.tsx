import Awards from "../../components/mainpage/Awards"
import Footer from "../../components/mainpage/Footer"
import MissionAndVersion from "../../components/mainpage/MissionAndVersion"
import Navbar from "../../components/mainpage/Navbar"
import Testimonials from "../../components/mainpage/Testimonials"


const About = () => {
  return (
    <div>
      <Navbar/>
      <div
        className="flex flex-col items-center justify-center h-[78vh]"
        style={{
          backgroundImage: ` linear-gradient(rgba(26, 54, 93, 0.7), rgba(26, 54, 93, 0.6)), url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200)
  `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6">Story</h1>
        <p className="text-gray-200 text-lg text-center md:text-lg mt-4">
        Three decades of luxury, innovation, and exceptional hospitality
        </p>
        <div className="bg-[#C9A55C] text-white cursor-pointer mt-6 px-4 gap-5 py-2 text-sm flex items-center rounded-sm font-medium">
        <i className="fas fa-play text-xl"></i>
          Watch Our Story
        </div>
      </div>
      <MissionAndVersion/>
      <Awards/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default About

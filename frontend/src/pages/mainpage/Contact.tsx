import ContactSection from "../../components/mainpage/ContactSection"
import Footer from "../../components/mainpage/Footer"
import Navbar from "../../components/mainpage/Navbar"
import { Award } from "lucide-react"


const Contact = () => {
  return (
    <div>
      <Navbar/>
      {/* hero */}
      <div
        className="flex flex-col items-center justify-center h-[72vh] md:h-[62vh] bg-[#1A365D]"
      >
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-serif text-white mb-6">Contact Azure Horizon</h1>
        <p className="text-gray-200 text-lg text-center md:text-lg mt-4 w-full md:max-w-3xl">We're here to make your stay extraordinary. Reach out to us for reservations, inquiries, or any assistance you need.Three decades of luxury, innovation, and exceptional hospitality
        </p>
        <div className="bg-[#C9A55C] text-white cursor-pointer mt-6 px-4 gap-5 py-2 text-sm flex items-center rounded-sm font-medium">
        <Award size={16} className="mr-2" />
         Award-winning service
        </div>
      </div>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

export default Contact

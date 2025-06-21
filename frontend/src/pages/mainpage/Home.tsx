import Accomdations from "../../components/mainpage/Accomdations";
import AmenitiesSection from "../../components/mainpage/AmenitiesSection";
import BookingWidget from "../../components/mainpage/BookingWidget";
import Explore from "../../components/mainpage/Explore";
import Footer from "../../components/mainpage/Footer";
import Gallery from "../../components/mainpage/Gallery";
import HomeHero from "../../components/mainpage/HomeHero";
import Navbar from "../../components/mainpage/Navbar";
import StatSection from "../../components/mainpage/StatSection";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomeHero/>
      <BookingWidget/>
      <Accomdations/>
      <Explore/>
      <AmenitiesSection/>
      <StatSection/>
      <Gallery/>
      <Footer/>
    </div>
  )
}
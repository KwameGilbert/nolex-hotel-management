import Accomdations from "../../components/mainpage/Accomdations";
import AmenitiesSection from "../../components/mainpage/AmenitiesSection";
import BookingWidget from "../../components/mainpage/BookingWidget";
import Explore from "../../components/mainpage/Explore";
import HomeHero from "../../components/mainpage/HomeHero";
import Navbar from "../../components/mainpage/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomeHero/>
      <BookingWidget/>
      <Accomdations/>
      <Explore/>
      <AmenitiesSection/>
    </div>
  )
}
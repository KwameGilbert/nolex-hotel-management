import RoomCard from "./RoomCard";


const sampleRooms = [
  {
    title: "Romantic Honeymoon Suite",
    location: "12th Floor – Romance Wing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    price: 699,
    oldPrice: 799,
    rating: 4.9,
    reviews: 123,
    description: "Intimate and romantic suite designed for special celebrations and honeymoons.",
    guests: 2,
    beds: 1,
    bath: 1,
    size: "600 sq ft",
    tags: ["Ocean View", "King Bed", "Heart-shaped Jacuzzi", "Champagne Service", "+2 more"],
    amenities: ["wifi", "tv", "food", "ac", "calendar"],
  },
  {
    title: "Presidential Ocean Suite",
    location: "Top Floor – Ocean Wing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    price: 899,
    oldPrice: 1099,
    rating: 5,
    reviews: 89,
    description: "The epitome of luxury with panoramic ocean views, private terrace, and dedicated butler service.",
    guests: 4,
    beds: 2,
    bath: 2,
    size: "1200 sq ft",
    tags: ["Ocean View", "Private Terrace", "2 Bedrooms", "Butler Service", "+4 more"],
    amenities: ["wifi", "tv", "ac", "fan", "calendar"],

  },
  {
    title: "Family Suite",
    location: "Main Floor – Family Wing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    price: 499,
    oldPrice: 599,
    rating: 4.8,
    reviews: 78,
    description: "Comfortable and spacious suite with family-friendly features like a shared lounge and kids' play area.",
    guests: 4,
    beds: 2,
    bath: 1,
    size: "800 sq ft",
    tags: ["Family-Friendly", "Shared Lounge", "Kids' Play Area", "Balcony", "+2 more"],
    amenities: ["wifi", "tv", "ac", "fan", "calendar"],
  }
];

export default function RoomList() {
  return (
    <div className="grid gap-6 p-6 sm:grid-cols-1 lg:grid-cols-3">
      {sampleRooms.map((room, index) => (
        <RoomCard key={index} room={room}/>
      ))}
    </div>
  );
}

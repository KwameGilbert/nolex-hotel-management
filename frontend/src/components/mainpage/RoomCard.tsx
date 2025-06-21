
import {
  BedDouble,
  Bath,
  Ruler,
  User,
  Wifi,
  Tv,
  Utensils,
  Snowflake,
  Fan,
  Calendar,
  Star
} from "lucide-react";

const RoomCard = ({
  room
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-xl">
      {/* Image */}
      <div className="relative h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${room.image})` }}>
        {/* Price */}
        <div className="absolute right-4 bottom-4 bg-white text-right px-2 rounded-md shadow">
          {room.oldPrice && <div className="line-through text-sm text-gray-400">${room.oldPrice}</div>}
          <div className="text-xl font-bold text-[#1A365D]">${room.price}</div>
          <div className="text-xs text-gray-500 py-2">per night</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-[#1A365D]">{room.title}</h3>
            <p className="text-sm text-gray-500">{room.location}</p>
          </div>
          <div className="flex items-center text-yellow-500 gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span>{room.rating}</span>
            <span className="text-gray-500">({room.reviews})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{room.description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1"><User size={14} /> {room.guests} guests</div>
          <div className="flex items-center gap-1"><BedDouble size={14} /> {room.beds} beds</div>
          <div className="flex items-center gap-1"><Bath size={14} /> {room.bath} bath</div>
          <div className="flex items-center gap-1"><Ruler size={14} /> {room.size}</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-1">
          {/* {room.tags.map((tag, idx) => (
            <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{tag}</span>
          ))} */}
        </div>

        {/* Amenities Icons */}
        <div className="flex flex-wrap gap-3 text-gray-400 mt-2">
          {room.amenities.includes("wifi") && <Wifi size={18} />}
          {room.amenities.includes("tv") && <Tv size={18} />}
          {room.amenities.includes("food") && <Utensils size={18} />}
          {room.amenities.includes("ac") && <Snowflake size={18} />}
          {room.amenities.includes("fan") && <Fan size={18} />}
          {room.amenities.includes("calendar") && <Calendar size={18} />}
        </div>
        {/* Buttons */}
        <div className="flex gap-3 mt-3">
          <button className="flex-1 border border-[#1A365D] text-[#1A365D] px-4 py-2 rounded-md hover:bg-[#1A365D] hover:text-white transition">
            View Details
          </button>
          <button className="flex-1 bg-[#C9A55C] text-white px-4 py-2 rounded-md hover:bg-[#c9a55c] transition">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

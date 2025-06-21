import { useState } from "react";
import RoomList from "./RoomCon";
const RoomsContainer = () => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [roomType, setRoomType] = useState<string>("");
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState<boolean>(false);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] =
    useState<boolean>(false);

  const roomTypes = [
    "Deluxe Room",
    "Executive Suite",
    "Presidential Suite",
    "Family Room",
    "Ocean View Suite",
  ];

  const handleGuestChange = (num: number) => {
    if (num >= 1 && num <= 10) {
      setGuests(num);
    }
    setIsGuestDropdownOpen(false);
  };

  const handleRoomTypeSelect = (type: string) => {
    setRoomType(type);
    setIsRoomDropdownOpen(false);
  };

  return (
    <div className="py-10 bg-white">
      {/* filter section */}
      <div className="max-w-5xl mx-auto -mt-16 bg-white shadow-xl p-8 border">
        <h2 className="text-2xl font-serif text-[#1A365D] mb-6 text-center">
          Book Your Stay
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-in Date
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none text-sm"
            />
          </div>
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <div className="relative">
              <button
                onClick={() => setIsRoomDropdownOpen(!isRoomDropdownOpen)}
                className="w-full p-3 border border-gray-300 bg-white text-left flex justify-between items-center cursor-pointer !rounded-button whitespace-nowrap"
              >
                <span className="text-sm">
                  {roomType || "Select Room Type"}
                </span>
                <i
                  className={`fas fa-chevron-${
                    isRoomDropdownOpen ? "up" : "down"
                  } text-gray-500`}
                ></i>
              </button>
              {isRoomDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto">
                  {roomTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => handleRoomTypeSelect(type)}
                      className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2 relative">
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <div className="relative">
              <button
                onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                className="w-full p-3 border border-gray-300 bg-white text-left flex justify-between items-center cursor-pointer !rounded-button whitespace-nowrap"
              >
                <span className="text-sm">
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </span>
                <i
                  className={`fas fa-chevron-${
                    isGuestDropdownOpen ? "up" : "down"
                  } text-gray-500`}
                ></i>
              </button>
              {isGuestDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div
                      key={num}
                      onClick={() => handleGuestChange(num)}
                      className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-[#1A365D] text-white px-8 py-3 hover:bg-opacity-90 transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
            Check Availability
          </button>
        </div>
      </div>

      {/* rooms container */}
      <div className="max-w-7xl mx-auto mt-12">
        <RoomList/>
      </div>
    </div>
  );
};

export default RoomsContainer;

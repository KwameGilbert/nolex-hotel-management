import { Bed, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface RoomType {
  id: string;
  name: string;
  description: string;
  price_per_night: string;
  max_occupancy: number;
  amenities: Record<string, boolean>;
}

interface Room {
  id: string;
  hotel_id: string;
  branch_id: string;
  room_type_id: string | null;
  room_number: string;
  floor: number;
  status: string;
  created_at: string;
  updated_at: string | null;
}

interface BranchRoom {
  room_type: RoomType;
  rooms: Room[];
}

interface ApiResponse {
  status: string;
  branchRooms: BranchRoom[];
  message: string | null;
}

export default function AddRoomForms() {
  const [branchRooms, setBranchRooms] = useState<BranchRoom[]>([]);
  const [availableFloors, setAvailableFloors] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Initialize as false
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    roomFloor: "",

    roomCapacity: 0,

    hotelId: "",
    branchId: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsed = JSON.parse(userData);
      const hotelId = parsed?.user?.hotel_id;
      const branchId = parsed?.user?.branch_id;
      setFormData((prev) => ({
        ...prev,
        hotelId: hotelId,
        branchId: branchId,
      }));
    }

    // Fetch branch rooms data
    fetchBranchRooms();
  }, []);

  useEffect(() => {
    if (formData.roomType) {
      const selectedRoomType = branchRooms.find(
        (branchRoom) => branchRoom.room_type?.id === formData.roomType
      );

      if (selectedRoomType) {
        const floors = [
          ...new Set(selectedRoomType.rooms.map((room) => room.floor)),
        ];
        setAvailableFloors(floors.sort((a, b) => a - b));
      }
    } else {
      setAvailableFloors([]);
    }

    // Reset room floor when room type changes
    setFormData((prev) => ({
      ...prev,
      roomFloor: "",
    }));
  }, [formData.roomType, branchRooms]);

  const fetchBranchRooms = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `https://hotel-management-system-5gk8.onrender.com/v1/branches/${formData.branchId}/rooms`      );
      setBranchRooms(response.data.branchRooms || []);
    } catch (err) {
      console.error("Failed to fetch branch rooms", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      room_number: formData.roomNumber,
      room_type_id: formData.roomType,
      floor: parseInt(formData.roomFloor),
      status: "available",
      hotel_id: formData.hotelId,
      branch_id: formData.branchId,
    };

    try {
      const res = await axios.post(
        "https://hotel-management-system-5gk8.onrender.com/v1/rooms",
        payload
      );
      alert(res.data.message || "Room created successfully!");

      setFormData((prev) => ({
        ...prev,
        roomNumber: "",
        roomType: "",
        roomFloor: "",

        roomCapacity: 0,
      }));
    } catch (err: any) {
      console.error("Room creation failed:", err);
      alert(err?.response?.data?.message || "Room creation failed");
    } finally {
      setLoading(false);
    }
  };

  // Get room types for dropdown (filter out null room types)
  const roomTypes = branchRooms
    .filter(
      (branchRoom) => branchRoom.room_type?.id && branchRoom.room_type?.name
    )
    .map((branchRoom) => branchRoom.room_type);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="hotelId" value={formData.hotelId} />
        <input type="hidden" name="branchId" value={formData.branchId} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8 justify-between">
          <div className="space-y-8 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type *
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    required
                  >
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number *
                  </label>

                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    placeholder="Enter room number"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Floor *
                  </label>
                  <select
                    name="roomFloor"
                    value={formData.roomFloor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    required
                    disabled={!formData.roomType}
                  >
                    <option value="">Select Floor</option>
                    {availableFloors.map((floor) => (
                      <option key={floor} value={floor}>
                        Floor {floor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Capacity *
                  </label>
                  <input
                    type="number"
                    name="roomCapacity"
                    value={formData.roomCapacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    placeholder="Enter room capacity"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:ml-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Bed className="w-5 h-5 mr-2 text-orange-600" />
                Add Room Summary
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type:</span>
                  <span className="font-medium">
                    {roomTypes.find((t) => t.id === formData.roomType)?.name ??
                      "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Number:</span>
                  <span className="font-medium">
                    {formData.roomNumber || "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Floor:</span>
                  <span className="font-medium">
                    {formData.roomFloor
                      ? `Floor ${formData.roomFloor}`
                      : "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Capacity:</span>
                  <span className="font-medium">
                    {formData.roomCapacity || "Not Selected"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center justify-center"
                disabled={loading}
              >
                <Check className="w-4 h-4 mr-2" />
                {loading ? "Creating Room..." : "Create Room"}
              </button>
              <button
                type="button"
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

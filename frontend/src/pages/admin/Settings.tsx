import { Globe, User2Icon, Upload } from "lucide-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  //  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  //  console.log(userData);
  

  // General settings state
  const [generalSettings, setGeneralSettings] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    description: "",
    logo: null
  });

  // Profile settings state (as per requirements)
  const [profileSettings, setProfileSettings] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  // Handle form input changes for general settings
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  // Handle form input changes for profile settings
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({ ...prev, [name]: value }));
  };

  // API function for general settings using axios
  const saveGeneralSettings = async () => {
    try {
      setIsSubmitting(true);

      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const API_URL = `https://hotel-management-system-5gk8.onrender.com/v1/hotels/${userData.user.hotel_id}`;

      const response = await axios.patch(API_URL, generalSettings);

      Swal.fire({
        title: "Success!",
        text: "Hotel settings updated successfully!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true
      });
      console.log("Settings saved:", response.data);
    } catch (error) {
      console.error("Error saving general settings:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update hotel settings. Please try again.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // API function for profile settings
  const saveProfileSettings = async () => {
    setIsSubmitting(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const hotel_id = userData.user.hotel_id;
      const branch_id = userData.user.branch_id || null;
      const user_id = userData.user.id;

      // Prepare payload
      const payload = {
        hotel_id,
        branch_id,
        username: profileSettings.username,
        name: profileSettings.name,
        email: profileSettings.email,
        phone: profileSettings.phone,
        password: profileSettings.password,
        role: profileSettings.role,
        is_active: 1
      };

      // Placeholder API URL
      const API_URL =  `https://hotel-management-system-5gk8.onrender.com/v1/users/${user_id}`; // Change this to your real API

      const response = await axios.patch(API_URL, payload);

      Swal.fire({
        title: "Success!",
        text: "User data updated successfully",
        icon: "success",
        timer: 3000,
        timerProgressBar: true
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update profile settings",
        icon: "error",
        timer: 3000,
        timerProgressBar: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col py-5">
      {/* top information */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide">Hotel Settings</h1>
        <p className="text-gray-400">
          Manage your hotel configuration and preferences
        </p>
      </div>

      <main className="flex items-start gap-5 py-6">
        {/* sidebar */}
        <div className="flex-[0.5]">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* main content */}
        <div className="flex-2 bg-white rounded-md shadow-md p-6">
          {activeTab === "general" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                General Information
              </h3>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={generalSettings.name}
                      onChange={handleGeneralChange}
                      placeholder="Enter Hotel's Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={generalSettings.phone}
                      onChange={handleGeneralChange}
                      placeholder="Company Phone Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralChange}
                      placeholder="Enter Hotel's Street Address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={generalSettings.city}
                      onChange={handleGeneralChange}
                      placeholder="Enter City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={generalSettings.country}
                      onChange={handleGeneralChange}
                      placeholder="Enter Country"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={generalSettings.email}
                      onChange={handleGeneralChange}
                      placeholder="Enter Hotel's Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={generalSettings.description}
                      onChange={handleGeneralChange}
                      placeholder="Brief description of your hotel"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hotel Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Logo</span>
                    </div>
                    <button 
                      type="button"
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload New Logo</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-end py-4">
                  <button 
                    type="button" 
                    onClick={saveGeneralSettings}
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white text-sm font-medium rounded-sm cursor-pointer transition-colors ${
                      isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Your Profile
              </h3>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={profileSettings.username}
                      onChange={handleProfileChange}
                      placeholder="Enter your username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileSettings.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileSettings.email}
                      onChange={handleProfileChange}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileSettings.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={profileSettings.password}
                      onChange={handleProfileChange}
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={profileSettings.role}
                      onChange={handleProfileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end py-4">
                  <button
                    type="button"
                    onClick={saveProfileSettings}
                    disabled={isSubmitting}
                    className={`bg-blue-600 px-4 py-2 text-white text-sm font-medium rounded-sm cursor-pointer hover:bg-blue-700 transition-colors ${
                      isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const tabs = [
  { id: "general", label: "General", icon: Globe },
  { id: "profile", label: "Profile", icon: User2Icon }
];

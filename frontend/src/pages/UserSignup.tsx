import React, { useState } from "react";
import { Mail, User, Lock, Eye, EyeOff, ArrowRight, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Image1 from "/assets/images/image3.jpg";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all required fields",
        icon: "error",
      });
      return false;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        title: "Password Too Short",
        text: "Password must be at least 6 characters long",
        icon: "error",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: "Passwords Don't Match",
        text: "Please make sure your passwords match",
        icon: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // TODO: Replace with actual user signup API endpoint
    axios
      .post("https://hotel-management-system-5gk8.onrender.com/v1/auth/user-signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        password: formData.password,
      })
      .then((res: any) => {
        if (res.data.code === 200 && res.data.status === 'success') {
          Swal.fire({
            title: "Account Created Successfully",
            text: "Welcome to Azure Horizon! Please check your email to verify your account.",
            icon: "success",
          }).then(() => {
            window.location.href = "/user-login";
          });
        } else {
          Swal.fire({
            title: "Signup Failed",
            text: res.data.message || "Something went wrong. Please try again.",
            icon: "error",
          });
        }
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while creating your account. Please try again.",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img src={Image1} alt="Azure Horizon Hotel" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Centered Modal */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Logo and Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden">
              <img src={Image1} alt="Azure Horizon" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#C9A55C] mb-1">
              Azure Horizon
            </h1>
            <p className="text-gray-600 text-sm">Create your account</p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-serif font-bold text-[#1A365D] mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">
              Join Azure Horizon and start your journey
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-xs font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none text-sm"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Password fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-8 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full pl-8 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A55C] text-white py-3 rounded-lg hover:bg-[#B89448] transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/user-login"
                className="text-[#C9A55C] hover:text-[#B89448] font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-[#C9A55C] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#C9A55C] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-6 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Azure Horizon. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
} 
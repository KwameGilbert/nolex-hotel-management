import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Image1 from "/assets/images/image3.jpg";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your email address",
        icon: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual forgot password API endpoint
      await axios.post("https://hotel-management-system-5gk8.onrender.com/v1/auth/user-forgot-password", {
        email: email
      });

      setIsSubmitted(true);
      Swal.fire({
        title: "Email Sent",
        text: "If an account with that email exists, we've sent password reset instructions.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      // Don't show error to prevent email enumeration
      setIsSubmitted(true);
      Swal.fire({
        title: "Email Sent",
        text: "If an account with that email exists, we've sent password reset instructions.",
        icon: "success",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left side - Image section */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          <img src={Image1} alt="Azure Horizon Hotel" className="object-cover w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-8">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
              Azure Horizon
            </h1>
            <div className="mb-8 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
            <p className="text-lg lg:text-xl max-w-md leading-relaxed">
              Don't worry, we'll help you get back to your account and continue 
              enjoying the luxury experience at Azure Horizon.
            </p>
          </div>
          {/* Decorative circle */}
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#C9A55C] rounded-full opacity-20"></div>
        </div>

        {/* Mobile Logo (only shows on mobile) */}
        <div className="lg:hidden flex justify-center items-center pt-8 pb-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold text-[#C9A55C] mb-2">
              Azure Horizon
            </h1>
            <p className="text-gray-600 text-sm">Reset your password</p>
          </div>
        </div>

        {/* Right side - Forgot Password form */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C9A55C] rounded-full opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1A365D] rounded-full opacity-10"></div>

          <div className="w-full max-w-md z-10">
            <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#C9A55C]/10 mb-6">
                  <Mail className="h-8 w-8 text-[#C9A55C]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#1A365D] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-600">
                  {isSubmitted 
                    ? "Check your email for reset instructions"
                    : "Enter your email address and we'll send you a link to reset your password."
                  }
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#C9A55C] text-white py-3 rounded-xl hover:bg-[#B89448] transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500">
                      Please check your email and follow the link to reset your password. 
                      The link will expire in 1 hour.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <Link
                  to="/user-login"
                  className="inline-flex items-center text-[#C9A55C] hover:text-[#B89448] font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-500 text-xs">
                    Don't have an account?{" "}
                    <Link to="/user-signup" className="text-[#C9A55C] hover:underline">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Azure Horizon. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
} 
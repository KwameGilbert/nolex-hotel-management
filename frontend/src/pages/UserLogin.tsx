import React, { useState, useEffect, useRef } from "react";
import { Mail, User, Lock, X, ArrowLeft, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Image1 from "/assets/images/image3.jpg";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserLogin() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password modal states
  const [forgotPasswordState, setForgotPasswordState] = useState({
    email: "",
    isLoading: false,
    isSubmitted: false,
    error: "",
  });

  // OTP modal state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const otpInputs = useRef<Array<HTMLInputElement | null>>([]);

  // Reset password modal state
  const [resetState, setResetState] = useState({
    password: "",
    confirmPassword: "",
    isLoading: false,
    error: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  // Track modal stack for back navigation
  const [modalStack, setModalStack] = useState<string[]>([]);

  // Add this state for countdown
  const [resendCountdown, setResendCountdown] = useState(60);

  // Add these states in your component:
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://hotel-management-system-5gk8.onrender.com/v1/auth/user-login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.code === 200 && res.data.status === 'success') {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              user: res.data.user,
              token: res.data.token,
            })
          ); 
          setIsLoading(false);
          Swal.fire({
            title: "Login Successful",
            text: "Welcome back!",
            icon: "success",
          });
          window.location.href = "/user-dashboard";
        } else {
          Swal.fire({
            title: "Login Failed",
            text: res.data.message || "Invalid credentials",
            icon: "error",
          });
          setIsLoading(false);
        }
      })
      .catch((error) => {  
        console.log(error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while logging in. Please try again.",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Forgot Password Submit
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordState.email.trim()) {
      setForgotPasswordState((prev) => ({
        ...prev,
        error: "Email is required",
      }));
      return;
    }

    if (!validateEmail(forgotPasswordState.email)) {
      setForgotPasswordState((prev) => ({
        ...prev,
        error: "Please enter a valid email address",
      }));
      return;
    }

    setForgotPasswordState((prev) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));

    try {
      // API call to send OTP to email
      const response = await axios.post(
        "https://hotel-management-system-5gk8.onrender.com/v1/auth/forgot-password",
        { email: forgotPasswordState.email }
      );

      if (response.status !== 200) {
        setForgotPasswordState((prev) => ({
          ...prev,
          isLoading: false,
          error: response.data.message || "Failed to send OTP.",
        }));
        return;
      }

      // Calculate expiry in seconds
      const nowSeconds = Math.floor(Date.now() / 1000);
      const expiresIn = Number(response.data.expires_in); // e.g., 600
      const otpExpiry = nowSeconds + expiresIn;

      // Store in localStorage
      localStorage.setItem(
        "forgotPasswordData",
        JSON.stringify({
          user: response.data.user,
          token: response.data.token,
          expires_in: otpExpiry,
        })
      );

      Swal.fire({
        title: "OTP Sent",
        text: "An OTP has been sent to your email. Please check your inbox.",
        icon: "success",
      });

      setForgotPasswordState((prev) => ({
        ...prev,
        isLoading: false,
        isSubmitted: true,
      }));
      setShowForgotModal(false);
      setShowOtpModal(true);
      setModalStack((prev) => [...prev, "forgot"]);
    } catch (error: any) {
      setForgotPasswordState((prev) => ({
        ...prev,
        isLoading: false,
        error: error?.response?.data?.message || "Network error. Please try again.",
      }));
    }
  };

  // OTP Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input if value entered
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
    // Move to previous input if deleted
    if (!value && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
    setOtpError("");
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("Text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpInputs.current[5]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    // Expiry check
    const forgotData = localStorage.getItem("forgotPasswordData");
    

    setIsVerifyingOtp(true);
    try {
      // API call to verify OTP
      const response = await axios.post(
        "https://hotel-management-system-5gk8.onrender.com/v1/auth/validate-otp",
        { otp: otp.join("") }
      );
      if (response.status !== 200) {
        setOtpError(response.data.message || "Invalid OTP. Please try again.");
        return;
      }
      Swal.fire({
        title: "OTP Verified",
        text: "Your OTP has been successfully verified.",
        icon: "success",
      });
      setShowOtpModal(false);
      setShowResetModal(true);
      setModalStack((prev) => [...prev, "otp"]);
    } catch (error: any) {
      setOtpError(error?.response?.data?.message || "Error. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      // TODO: Call API to resend OTP here
      // await axios.post("/api/resend-otp", { email: forgotPasswordState.email });
      Swal.fire("OTP resent!", "Check your email for a new code.", "info");
      setResendCountdown(60);
    } catch (error) {
      Swal.fire("Error", "Failed to resend OTP.", "error");
    } finally {
      setIsResendingOtp(false);
    }
  };

  // Reset Password Modal Handlers
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetState.password || !resetState.confirmPassword) {
      setResetState((prev) => ({
        ...prev,
        error: "Please fill in all fields.",
      }));
      return;
    }
    if (resetState.password.length < 6) {
      setResetState((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters.",
      }));
      return;
    }
    if (resetState.password !== resetState.confirmPassword) {
      setResetState((prev) => ({
        ...prev,
        error: "Passwords do not match.",
      }));
      return;
    }
    setResetState((prev) => ({
      ...prev,
      isLoading: true,
      error: "",
    }));
    // TODO: Call API to reset password
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResetState({
      password: "",
      confirmPassword: "",
      isLoading: false,
      error: "",
      showPassword: false,
      showConfirmPassword: false,
    });
    setShowResetModal(false);
    setModalStack([]);
    Swal.fire({
      title: "Password Reset Successful",
      text: "You can now log in with your new password.",
      icon: "success",
    });
  };

  // Modal Navigation
  const handleBack = () => {
    if (modalStack.length === 0) return;
    const prev = modalStack[modalStack.length - 1];
    setModalStack((stack) => stack.slice(0, -1));
    if (showResetModal) {
      setShowResetModal(false);
      if (prev === "otp") setShowOtpModal(true);
    } else if (showOtpModal) {
      setShowOtpModal(false);
      if (prev === "forgot") setShowForgotModal(true);
    }
  };

  const closeAllModals = () => {
    setShowForgotModal(false);
    setShowOtpModal(false);
    setShowResetModal(false);
    setModalStack([]);
    setForgotPasswordState({
      email: "",
      isLoading: false,
      isSubmitted: false,
      error: "",
    });
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setResetState({
      password: "",
      confirmPassword: "",
      isLoading: false,
      error: "",
      showPassword: false,
      showConfirmPassword: false,
    });
  };

  // Start countdown when OTP modal opens
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showOtpModal && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (!showOtpModal) {
      setResendCountdown(60); // Reset when modal closes
    }
    return () => clearInterval(timer);
  }, [showOtpModal, resendCountdown]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img src={Image1} alt="Azure Horizon Hotel" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Centered Modal */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
              <img src={Image1} alt="Azure Horizon" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-[#C9A55C] mb-2">
              Azure Horizon
            </h1>
            <p className="text-gray-600 text-sm">Welcome back</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#1A365D] mb-2">
              Sign In
            </h2>
            <p className="text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C9A55C] focus:border-transparent outline-none placeholder-gray-400 text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#C9A55C] hover:text-[#B89448] transition-colors duration-200"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#C9A55C] text-white py-3 rounded-xl hover:bg-[#B89448] transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                "Signing In..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/user-signup"
                className="text-[#C9A55C] hover:text-[#B89448] font-medium transition-colors duration-200"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-500 text-xs">
                By signing in, you agree to our{" "}
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

        <footer className="mt-8 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Azure Horizon. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
              onClick={closeAllModals}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Forgot Password?
                </h2>
                <p className="text-gray-600">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-1 placeholder-gray-400 text-sm"
                      placeholder="Enter your email"
                      value={forgotPasswordState.email}
                      onChange={e =>
                        setForgotPasswordState(prev => ({
                          ...prev,
                          email: e.target.value,
                          error: "",
                        }))
                      }
                      required
                      disabled={forgotPasswordState.isLoading}
                    />
                  </div>
                  {forgotPasswordState.error && (
                    <div className="flex items-center text-red-600 text-xs mt-2">
                      <span className="mr-1">!</span>
                      {forgotPasswordState.error}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={forgotPasswordState.isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-500 transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotPasswordState.isLoading ? "Sending..." : "Send Reset OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
              onClick={closeAllModals}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <button
                  className="mr-3 text-blue-600 hover:text-blue-800 transition"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 flex-1 text-center">
                  Enter OTP
                </h2>
              </div>
              <p className="text-gray-500 mb-6 text-center text-sm">
                Enter the 6-digit code sent to your email.
              </p>
              <form onSubmit={handleOtpSubmit} className="flex flex-col items-center">
                <div className="flex gap-2 mb-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => { otpInputs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition font-mono"
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value)}
                      onPaste={handleOtpPaste}
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>
                {otpError && (
                  <div className="text-red-500 text-sm mb-2">{otpError}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition mb-2 disabled:opacity-50"
                  disabled={isVerifyingOtp}
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                </button>
              </form>
              <button
                type="button"
                className={`text-blue-500 hover:underline text-sm mt-2 disabled:opacity-50`}
                onClick={handleResendOtp}
                disabled={resendCountdown > 0 || isResendingOtp}
              >
                {isResendingOtp
                  ? "Resending..."
                  : resendCountdown > 0
                  ? `Resend OTP in 0:${resendCountdown.toString().padStart(2, "0")}`
                  : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
              onClick={closeAllModals}
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-8">
              <div className="flex items-center mb-6">
                <button
                  className="mr-3 text-blue-600 hover:text-blue-800 transition"
                  onClick={handleBack}
                  aria-label="Back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 flex-1 text-center">
                  Reset Password
                </h2>
              </div>
              <form onSubmit={handleResetPasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={resetState.showPassword ? "text" : "password"}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:ring-1 placeholder-gray-400 text-sm"
                      placeholder="Enter new password"
                      value={resetState.password}
                      onChange={e =>
                        setResetState(prev => ({
                          ...prev,
                          password: e.target.value,
                          error: "",
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() =>
                        setResetState(prev => ({
                          ...prev,
                          showPassword: !prev.showPassword,
                        }))
                      }
                      tabIndex={-1}
                    >
                      {resetState.showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={resetState.showConfirmPassword ? "text" : "password"}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:ring-1 placeholder-gray-400 text-sm"
                      placeholder="Confirm new password"
                      value={resetState.confirmPassword}
                      onChange={e =>
                        setResetState(prev => ({
                          ...prev,
                          confirmPassword: e.target.value,
                          error: "",
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() =>
                        setResetState(prev => ({
                          ...prev,
                          showConfirmPassword: !prev.showConfirmPassword,
                        }))
                      }
                      tabIndex={-1}
                    >
                      {resetState.showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                {resetState.error && (
                  <div className="text-red-500 text-sm">{resetState.error}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                  disabled={resetState.isLoading}
                >
                  {resetState.isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
import { Routes, Route, Navigate } from "react-router-dom";
import UserDashboardLayout from "./UserDashboardLayout";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Bookings from "./Bookings";
import Refunds from "./Refunds";
import Reviews from "./Reviews";
import Complaints from "./Complaints";

export default function UserDashboard() {
  // Check if user is authenticated
  const userData = localStorage.getItem("userData");
  
//   if (!userData) {
//     return <Navigate to="/user-login" replace />;
//   }

  return (
    <Routes>
      <Route path="/" element={<UserDashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="refunds" element={<Refunds />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="complaints" element={<Complaints />} />
      </Route>
    </Routes>
  );
} 
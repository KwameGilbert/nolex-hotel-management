import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainLayout from './components/layout/MainLayout.tsx'
import Dashboard from './pages/admin/Dashboard.tsx'
import NewBooking from './pages/admin/NewBooking.tsx'
import Bookings from './pages/admin/Bookings.tsx'
import Customer from './pages/admin/Customer.tsx'
import RoomAvailability from './pages/admin/RoomAvailability.tsx'
import Staff from './pages/admin/Staff.tsx'
import Reports from './pages/admin/Reports.tsx'
import AddRoom from './pages/admin/AddRoom.tsx'
import Login from './pages/Login.tsx'
import Settings from './pages/admin/Settings.tsx'
import RecepMainLayout from './components/layout/receptioniast/RecepMainLayout.tsx'
import RecepDashboard from './pages/receptionist/Dashboard.tsx'
import ReportIssueForm from './pages/receptionist/ReportIssueForm.tsx'
import Issues from './pages/admin/Issues.tsx'
import MakeReport from './pages/admin/MakeReport.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'
import OTP from './pages/OTP.tsx'
import RoomType from './pages/admin/RoomType.tsx'
import PayBooking from './pages/admin/PayBooking.tsx'
import NotFoundPage from './pages/404.tsx'
import CeoMainLayout from './components/layout/ceo/CeoMainLayout.tsx'
import CeoDashbord from './pages/ceo/Dashbord.tsx'
import CeoRevenue from './pages/ceo/CeoRevenue.tsx'
import Home from './pages/mainpage/Home.tsx'
import Service from './pages/mainpage/Service.tsx'
import Rooms from './pages/mainpage/Rooms.tsx'
import About from './pages/mainpage/About.tsx'
import Contact from './pages/mainpage/Contact.tsx'
import SuperAdminMainLayout from './components/layout/super-admin/MainLayout.tsx'
import SuperAdmin from './pages/super-admin/Dashboard.tsx'
import ViewBooking from './pages/admin/ViewBooking.tsx'
import EditBooking from './pages/admin/EditBooking.tsx'
import ViewCustomer from './pages/admin/ViewCustomer.tsx'
import EditCustomer from './pages/admin/EditCustomer.tsx'
import RefundsPage from './pages/admin/RefundsPage.tsx'



createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/rooms' element={<Rooms/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>



      <Route path='/login' element={<Login/>}/>
      <Route path='/otp' element={<OTP />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="new-booking" element={<NewBooking />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:bookingId/view" element={<ViewBooking />} />
        <Route path="bookings/:bookingId/edit" element={<EditBooking />} />
        <Route path="customers" element={<Customer />} />
        <Route path="customers/:id/view" element={<ViewCustomer />} />
        <Route path="customers/:id/edit" element={<EditCustomer />} />
        <Route path="room-availability" element={<RoomAvailability />} />
        <Route path="staff" element={<Staff />} />
        <Route path="reports" element={<Reports />} />
        <Route path="add-room" element={<AddRoom />} />
        <Route path="settings" element={<Settings />} />
        <Route path="issues" element={<Issues />} />
        <Route path="make-reports-admin" element={<MakeReport />} />
        <Route path="add-room-type" element={<RoomType />} />
        <Route path="complain" element={<Complains/>}/>
        <Route path="pay-booking/:bookingCode" element={<PayBooking />} />
        <Route path="refunds" element={<RefundsPage />} />
      </Route>

      {/* Protected Receptionist Routes */}
      <Route path="/receptionist" element={<ProtectedRoute><RecepMainLayout /></ProtectedRoute>}>
        <Route index element={<RecepDashboard />} />
        <Route path="new-booking" element={<NewBooking />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="room-availability" element={<RoomAvailability />} />
        <Route path="customers" element={<Customer />} />
        <Route path="make-reports" element={<ReportIssueForm />} />
      </Route>

      {/* Protected CEO Routes */}
      <Route path="/ceo" element={<ProtectedRoute><CeoMainLayout/></ProtectedRoute>}>
        <Route index element={<CeoDashbord />} />
        <Route path="revenue" element={<CeoRevenue/>}/>
        <Route path="staff" element={<Staff />} />
        <Route path="settings" element={<Settings />} />
        <Route path="issues" element={<Issues />} />
        <Route path="customers" element={<Customer />} />
      </Route>

      <Route path="/super-admin" element={<SuperAdminMainLayout/>}>
        <Route index element={<SuperAdmin/>}/>
        <Route path="super-admin-hotels" element={<AllHotels/>}/>
        <Route path="super-admin-ceo" element={<Ceo/>}/>
        <Route path="super-admin-ceo/add-ceo" element={<AddCEOPage/>}/>
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="system-reports" element={<SystemReportsPage />}/>
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 catch-all route - must be LAST in the Routes list */}
      <Route path="/page-not-found" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

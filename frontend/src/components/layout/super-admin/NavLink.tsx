import {
  LayoutDashboard, 
  CalendarDays, 
  Bed, 
  Users,
  ChartBar,  
  Settings, 
  Book,
  ChartAreaIcon
} from "lucide-react";

export const superadminnavLinks = [
  {
    title: "MAIN",
    menuItems: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', role: 'all'  },
      { icon: Book, label: 'New Booking', path: 'new-booking', role: 'receptionist' },
      { icon: CalendarDays, label: 'Bookings', path: 'bookings', role: 'all' },
      { icon: Bed, label: 'Room Availability', path: 'room-availability', role: 'receptionist' },
      { icon: Users, label: "Customer", path: "customers" },
      { icon: Bed, label: "Add Room", path: "add-room" },
      { icon: Bed, label: "Add Room Type", path: "add-room-type" },
    ],
  },
  {
    title: "REPORTS",
    menuItems: [
      { icon: ChartBar, label: 'Reports', path: 'reports', role: 'manager' },
      { icon: ChartAreaIcon, label: 'My Issues', path: 'issues', role: 'manager' },
      { icon: ChartAreaIcon, label: 'Make Report', path: 'make-reports-admin', role: 'manager' },
    ],
  },
  {
    title: "ADMINISTRATION",
    menuItems: [
      { icon: Users, label: "Staff", path: "staff" },
      { icon: Settings, label: "Settings", path: "settings" },
      { icon: Settings, label: "Logout", path: "/" },
    ],
  },
];

import {
  LayoutDashboard, 
  Users,  
  Settings, 
  ChartAreaIcon,
  DollarSignIcon
} from "lucide-react";

export const navLinks = [
  {
    title: "MAIN",
    menuItems: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/ceo', role: 'all'  },
      { icon: DollarSignIcon, label: 'Revenue', path: 'revenue', role: 'receptionist' },
      { icon: Users, label: "Customer", path: "customers" },
    ],
  },
  {
    title: "REPORTS",
    menuItems: [
      { icon: ChartAreaIcon, label: 'My Issues', path: 'issues', role: 'manager' },
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

import {
  LayoutDashboard,
  Hotel,
  UserCircle,
  CreditCard,
  ChartAreaIcon,
  Settings
} from "lucide-react";

export const superadminnavLinks = [
  {
    title: "MAIN",
    menuItems: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/super-admin",
        role: "all"
      },
      {
        icon: Hotel,
        label: "All Hotels",
        path: "super-admin-hotels",
        role: "superadmin"
      },
      {
        icon: UserCircle,
        label: "Manage CEOs",
        path: "super-admin-ceo",
        role: "superadmin"
      },
      {
        icon: CreditCard,
        label: "Payments",
        path: "payments",
        role: "superadmin"
      }
    ]
  },
  {
    title: "REPORTS",
    menuItems: [
      {
        icon: ChartAreaIcon,
        label: "System Reports",
        path: "system-reports",
        role: "superadmin"
      }
    ]
  },
  {
    title: "ADMINISTRATION",
    menuItems: [
      
      {
        icon: Settings,
        label: "Settings",
        path: "settings",
        role: "superadmin"
      },
      {
        icon: Settings,
        label: "Logout",
        path: "/",
        role: "all"
      }
    ]
  }
];

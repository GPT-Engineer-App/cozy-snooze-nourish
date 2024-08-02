import { Home, Baby } from "lucide-react";
import Dashboard from "./pages/Dashboard.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
    page: <Dashboard />,
  },
];

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

import {
  BarChart2,
  ShoppingBag,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/" },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideNavbar() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

const { darkMode, toggleDarkMode } = useTheme();

  // Set current path based on location
  const currentPath = location.pathname;

  // Handle navigation with loading state
  const handleNavigation = (path) => {
    if (path !== currentPath) {
      setIsLoading(true);
      // Close mobile menu when navigating
      setIsMobileMenuOpen(false);
    }
  };

  // Reset loading state when location changes
  useEffect(() => {
    setIsLoading(false);
  }, [location]);

  // The actual sidebar content - reused in both desktop and mobile views
  const sidebarContent = (
    <>
      <div className="flex h-16 shrink-0 items-center">
        <img
          alt="Your Company"
          src="/src/assets/react.svg" // Updated path for better reliability
          className="h-8 w-auto"
        />
      </div>

      {isLoading && (
        <div className="w-full px-2 py-1">
          <div className="h-1 bg-indigo-500 rounded-full animate-pulse"></div>
        </div>
      )}

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={classNames(
                      currentPath === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <item.icon
                      style={{ color: item.color }}
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={classNames(
                      team.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <a
              href="#"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <img
                alt=""
                src="/src/assets/react.svg" // Updated path for better reliability
                className="h-8 w-8 rounded-full bg-gray-800"
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Dark mode toggle button */}
      <div className="flex items-center justify-center p-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-40 lg:hidden">
        <button
          type="button"
          className="p-3 m-2 bg-gray-900 text-gray-400 rounded-md hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-gray-900/80 lg:hidden">
          <div className="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 px-6 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          {sidebarContent}
        </div>
      </div>

      {/* Main content spacing for desktop */}
      <div className="hidden lg:block lg:pl-64"></div>
    </>
  );
}

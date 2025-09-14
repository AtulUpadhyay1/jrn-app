import Icon from "@/components/ui/Icon";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useNavbarType from "@/hooks/useNavbarType";
import useMenulayout from "@/hooks/useMenulayout";
import useSkin from "@/hooks/useSkin";
import Logo from "@/components/partials/header/Tools/Logo";
import useRtl from "@/hooks/useRtl";
import useMobileMenu from "@/hooks/useMobileMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogOut } from "@/store/api/auth/adminAuthSlice";
import { toast } from "react-toastify";

const AdminHeader = ({ className = "custom-class" }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  const { width, breakpoints } = useWidth();
  const [navbarType] = useNavbarType();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminUser } = useSelector((state) => state.adminAuth);
  
  const navbarTypeClass = () => {
    switch (navbarType) {
      case "floating":
        return "floating has-sticky-header";
      case "sticky":
        return "sticky top-0 z-999";
      case "static":
        return "static";
      case "hidden":
        return "hidden";
      default:
        return "sticky top-0";
    }
  };

  const [menuType] = useMenulayout();
  const [skin] = useSkin();
  const [isRtl] = useRtl();
  const [mobileMenu, setMobileMenu] = useMobileMenu();

  const handleOpenMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = () => {
    dispatch(adminLogOut());
    navigate("/admin/login");
    toast.success("Admin logged out successfully");
    setDropdownOpen(false);
  };

  const borderSwicthClass = () => {
    if (skin === "bordered" && navbarType !== "floating") {
      return "border-b border-slate-200/60 dark:border-slate-700/60";
    } else if (skin === "bordered" && navbarType === "floating") {
      return "border border-slate-200 dark:border-slate-700";
    } else {
      return "dark:border-b dark:border-slate-700/60";
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className={className + " " + navbarTypeClass()}>
      <div
        className={`app-header md:px-6 px-[15px] dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white
        ${borderSwicthClass()}
        ${menuType === "horizontal" && width > breakpoints.xl ? "py-1" : "md:py-6 py-3"}`}
      >
        <div className="flex justify-between items-center h-full">
          {/* Left Section */}
          {menuType === "vertical" && (
            <div className="flex items-center md:space-x-4 space-x-2 rtl:space-x-reverse">
              {collapsed && width >= breakpoints.xl && (
                <button
                  className="text-xl text-slate-900 dark:text-white"
                  onClick={() => setMenuCollapsed(!collapsed)}
                >
                  {isRtl ? (
                    <Icon icon="akar-icons:arrow-left" />
                  ) : (
                    <Icon icon="akar-icons:arrow-right" />
                  )}
                </button>
              )}
              {width < breakpoints.xl && <Logo />}
              {/* Mobile menu handler */}
              {width < breakpoints.xl && width >= breakpoints.md && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
              <div className="w-full max-w-sm">
                <p className="text-sm font-semibold text-gray-800 mb-1">Admin Panel</p>
                <p className="text-xs text-gray-600">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Right Section - Admin Tools */}
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            {width <= breakpoints.md && (
              <div
                className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                onClick={handleOpenMobileMenu}
              >
                <Icon icon="heroicons-outline:menu-alt-3" />
              </div>
            )}

            <div className="flex items-center space-x-4">
              {/* Admin Stats */}
              <div className="hidden md:flex items-center space-x-4 px-3 py-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online Users</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">89</p>
                </div>
                <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active Sessions</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">156</p>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-500 rounded-lg transition-all">
                  <Icon className="h-5 w-5" icon="heroicons-outline:bell" />
                </button>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </div>

              {/* Admin User Menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {adminUser?.email?.[0]?.toUpperCase() || "A"}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Admin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-32">
                      {adminUser?.email || "admin@example.com"}
                    </p>
                  </div>
                  <Icon className="text-gray-400 text-sm" icon="heroicons-outline:chevron-down" />
                </button>

                {/* Admin Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Admin Panel</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {adminUser?.email}
                        </p>
                      </div>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon className="mr-3 h-4 w-4" icon="heroicons-outline:user-circle" />
                        Admin Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon className="mr-3 h-4 w-4" icon="heroicons-outline:cog-6-tooth" />
                        System Settings
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Icon className="mr-3 h-4 w-4" icon="heroicons-outline:shield-check" />
                        Security
                      </a>
                      <hr className="my-1 border-gray-200 dark:border-slate-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                      >
                        <Icon className="mr-3 h-4 w-4" icon="heroicons-outline:arrow-right-on-rectangle" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
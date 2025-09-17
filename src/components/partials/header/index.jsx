import Icon from "@/components/ui/Icon";
import HorizentalMenu from "./Tools/HorizentalMenu";
import useWidth from "@/hooks/useWidth";
import useSidebar from "@/hooks/useSidebar";
import useNavbarType from "@/hooks/useNavbarType";
import useMenulayout from "@/hooks/useMenulayout";
import useSkin from "@/hooks/useSkin";
import Logo from "./Tools/Logo";
import useRtl from "@/hooks/useRtl";
import useMobileMenu from "@/hooks/useMobileMenu";
import LiveDateTime from "./LiveDateTime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import useProfile from "../../../hooks/useProfile";

const Header = ({ className = "custom-class" }) => {
  const [collapsed, setMenuCollapsed] = useSidebar();
  const { width, breakpoints } = useWidth();
  const [navbarType] = useNavbarType();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const navbarTypeClass = () => {
    switch (navbarType) {
      case "floating":
        return "floating  has-sticky-header";
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
    dispatch(logOut());
    navigate("/");
    toast.success("Logged out successfully");
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
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useProfile();
  return (
    <header className={className + " " + navbarTypeClass()}>
      <div
        className={` app-header md:px-6 px-[15px]  dark:bg-slate-800 shadow-base dark:shadow-base3 bg-white
        ${borderSwicthClass()}
             ${menuType === "horizontal" && width > breakpoints.xl
            ? "py-1"
            : "md:py-6 py-3"
          }
        `}
      >
        <div className="flex justify-between items-center h-full">
          {/* For Vertical  */}

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
              {/* open mobile menu handlaer*/}
              {width < breakpoints.xl && width >= breakpoints.md && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
              {/* <SearchModal /> */}
              <div className="w-full max-w-sm">
                <p className="text-sm font-semibold text-gray-800 mb-1">Dashboard</p>
                <LiveDateTime />
              </div>
            </div>
          )}
          {/* For Horizontal  */}
          {menuType === "horizontal" && (
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Logo />
              {/* open mobile menu handlaer*/}
              {width <= breakpoints.xl && (
                <div
                  className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                  onClick={handleOpenMobileMenu}
                >
                  <Icon icon="heroicons-outline:menu-alt-3" />
                </div>
              )}
            </div>
          )}
          {/*  Horizontal  Main Menu */}
          {menuType === "horizontal" && width >= breakpoints.xl ? (
            <HorizentalMenu />
          ) : null}
          {/* Nav Tools  */}
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3 rtl:space-x-reverse">
            {/* <Language />
            <SwitchDark />
            <MonoChrome /> */}
            {/* {width >= breakpoints.md && <Message />}
            {width >= breakpoints.md && <Notification />}
            {width >= breakpoints.md && <Profile />} */}
            {width <= breakpoints.md && (
              <div
                className="cursor-pointer text-slate-900 dark:text-white text-2xl"
                onClick={handleOpenMobileMenu}
              >
                <Icon icon="heroicons-outline:menu-alt-3" />
              </div>
            )}
            <div className="flex items-center space-x-4">
              {/* <div className="w-full max-w-sm">
                <p className="text-sm font-semibold text-gray-800 mb-1">Your Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <p className="text-sm text-gray-700">78/100</p>
                </div>
              </div> */}


              {/* Bell Icon with Pulse */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-500 rounded-lg transition-all">
                  <Icon className="h-5 w-5" icon="heroicons-outline:bell" />
                </button>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-grey-500 hover:text-white transition-all"
                >
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{profileData?.user?.first_name[0] || "U"}</span>
                  </div>
                  <Icon className="fas fa-chevron-down text-grey-400 text-sm" icon="heroicons-outline:chevron-down" />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Icon className="mr-3" icon="heroicons-outline:user" />
                        Profile
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Icon className="mr-3" icon="heroicons-outline:cog" />
                        Settings
                      </a>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <Icon className="mr-3" icon="heroicons-outline:logout" />
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

export default Header;


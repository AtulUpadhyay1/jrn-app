import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "@/components/partials/sidebar/Logo";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import { useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import Icon from "@/components/ui/Icon";

// Admin Menu Items
const adminMenuItems = [
  {
    isHeadr: true,
    title: "Admin Panel",
  },
  {
    title: "Dashboard",
    isHide: true,
    icon: "heroicons-outline:home",
    link: "/admin/dashboard",
  },
  {
    isHeadr: true,
    title: "User Management",
  },
  {
    title: "All Users",
    isHide: true,
    icon: "heroicons-outline:users",
    link: "/admin/users",
  },
  {
    title: "User Analytics",
    isHide: true,
    icon: "heroicons-outline:chart-bar",
    link: "/admin/analytics",
  },
  {
    isHeadr: true,
    title: "Content Management",
  },
  {
    title: "Posts & Content",
    isHide: true,
    icon: "heroicons-outline:document-text",
    link: "/admin/content",
  },
  {
    title: "Reports",
    isHide: true,
    icon: "heroicons-outline:flag",
    link: "/admin/reports",
  },
  {
    isHeadr: true,
    title: "System",
  },
  {
    title: "Settings",
    isHide: true,
    icon: "heroicons-outline:cog-6-tooth",
    link: "/admin/settings",
  },
  {
    title: "Logs",
    isHide: true,
    icon: "heroicons-outline:document-text",
    link: "/admin/logs",
  },
];

const AdminNavigation = ({ menus }) => {
  const location = useLocation();

  return (
    <ul>
      {menus.map((item, i) => (
        <li
          key={i}
          className={`single-sidebar-menu ${
            item.link && location.pathname === item.link ? "menu-item-active" : ""
          }`}
        >
          {/* Menu headers */}
          {item.isHeadr && !item.child && (
            <div className="menulabel">{item.title}</div>
          )}
          
          {/* Single menu items */}
          {!item.child && !item.isHeadr && (
            <NavLink className="menu-link" to={item.link}>
              <span className="menu-icon grow-0">
                <Icon icon={item.icon} />
              </span>
              <div className="text-box grow">{item.title}</div>
              {item.badge && <span className="menu-badge">{item.badge}</span>}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};

const AdminSidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const { adminUser } = useSelector((state) => state.adminAuth);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [collapsed, setMenuCollapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState(false);

  // semi dark option
  const [isSemiDark] = useSemiDark();
  // skin
  const [skin] = useSkin();

  return (
    <div className={isSemiDark ? "dark" : ""}>
      <div
        className={`sidebar-wrapper bg-white dark:bg-slate-800 ${
          collapsed ? "w-[72px] close_sidebar" : "w-[248px]"
        }
        ${menuHover ? "sidebar-hovered" : ""}
        ${
          skin === "bordered"
            ? "border-r border-slate-200 dark:border-slate-700"
            : "shadow-base"
        }`}
        onMouseEnter={() => {
          setMenuHover(true);
          if (collapsed) {
            setMenuCollapsed(false);
          }
        }}
        onMouseLeave={() => {
          setMenuHover(false);
          if (!collapsed) {
            setMenuCollapsed(true);
          }
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        <div
          className={`h-[60px] absolute top-[80px] nav-shadow z-1 w-full transition-all duration-200 pointer-events-none ${
            scroll ? " opacity-100" : " opacity-0"
          }`}
        ></div>

        <SimpleBar
          className="sidebar-menu px-4 h-[calc(100%-80px)]"
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <AdminNavigation menus={adminMenuItems} />

          {/* Admin Info Section */}
          <div className="mb-8 mt-8">
            {!collapsed ? (
              // Full view when sidebar is expanded
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-center text-white">
                <div className="w-16 h-16 bg-white/20 mx-auto mb-3 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold mb-1">Admin Panel</p>
                <p className="text-xs opacity-90 truncate">
                  {adminUser?.email || "admin@example.com"}
                </p>
              </div>
            ) : (
              // Compact view when sidebar is collapsed
              <div className="flex flex-col items-center justify-center p-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default AdminSidebar;
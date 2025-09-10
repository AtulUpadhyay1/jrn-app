import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";

const LogoutButton = ({ children, className = "btn btn-dark" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children || "Logout"}
    </button>
  );
};

export default LogoutButton;

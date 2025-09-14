import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuth, adminUser } = useSelector((state) => state.adminAuth);

  if (!isAdminAuth || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
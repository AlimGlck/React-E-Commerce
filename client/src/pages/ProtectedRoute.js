import React from "react";
import { useAuth } from "../contexts/Authcontext.js";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;

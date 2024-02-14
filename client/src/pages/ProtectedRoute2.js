import React from "react";
import { useAuth } from "../contexts/Authcontext.js";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute2() {
  const { loggedIn, user } = useAuth();
  return (
    <div>
      {loggedIn && user.role === "admin" ? <Outlet /> : <Navigate to="/" />}
    </div>
  );
}

export default ProtectedRoute2;

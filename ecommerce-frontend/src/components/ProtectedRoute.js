import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodăm JWT pentru a verifica rolul utilizatorului
  const user = JSON.parse(atob(token.split(".")[1]));
  if (role && user.role !== role) {
    return <h2>Acces interzis!</h2>;
  }

  return children;
};

export default ProtectedRoute;

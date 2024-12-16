import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

  if (!storedEmail || !storedPassword) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

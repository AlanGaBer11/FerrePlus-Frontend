import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole === "ADMIN" && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

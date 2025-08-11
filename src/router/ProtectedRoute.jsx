import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isLoggedIn, isAdmin, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario está verificado
  if (!user?.verified) {
    return <Navigate to="/not-verified" replace />;
  }

  // Verificar si el usuario está activo
  if (!user?.status) {
    return <Navigate to="/not-activate" replace />;
  }

  if (requiredRole === "ADMIN" && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

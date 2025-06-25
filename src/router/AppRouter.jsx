import { Routes, Route } from "react-router";
import SignUpForm from "../components/auth/SignUpForm";
import LoginForm from "../components/auth/LoginForm";
import Dashboard from "../pages/ADMIN/Dashboard";
import Unauthorized from "../pages/error/Unauthorized";
import NotFound from "../pages/error/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<h1>Welcome to FerrePlus</h1>} />
      <Route path="/products" element={<h1>Products Page</h1>} />
      <Route path="/suppliers" element={<h1>Suppliers Page</h1>} />
      <Route path="/movements" element={<h1>Movements Page</h1>} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* RUTAS DE ADMINISTRADOR */}
      <Route path="/admin" element={<ProtectedRoute requiredRole={"ADMIN"} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index />
          <Route path="users" element={<h1> Admin Users Page</h1>} />
          <Route path="suppliers" element={<h1>Admin Supppliers Page</h1>} />
          <Route path="products" element={<h1>Admin Products Page</h1>} />
          <Route path="movements" element={<h1>Admin Movements Page</h1>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

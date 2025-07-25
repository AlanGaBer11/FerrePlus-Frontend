import { Routes, Route } from "react-router";
import ProtectedRoute from "@/router/ProtectedRoute";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";
import Dashboard from "@/pages/ADMIN/Dashboard";
import DashboardHome from "@/pages/ADMIN/DashboardHome";
import UserList from "@/pages/ADMIN/UserList";
import SupplierList from "@/pages/ADMIN/SupplierList";
import ProductList from "@/pages/ADMIN/ProductList";
import MovementList from "@/pages/ADMIN/MovementList";
import NotFound from "@/pages/error/NotFound";
import Unauthorized from "@/pages/error/Unauthorized";

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
      <Route
        path="/terms-conditions"
        element={<h1>Terms and Conditions Page</h1>}
      />
      <Route path="privacy-policy" element={<h1>Privacy Policy Page</h1>} />

      {/* RUTAS DE ADMINISTRADOR */}
      <Route path="/admin" element={<ProtectedRoute requiredRole={"ADMIN"} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserList />} />
          <Route path="suppliers" element={<SupplierList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="movements" element={<MovementList />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;

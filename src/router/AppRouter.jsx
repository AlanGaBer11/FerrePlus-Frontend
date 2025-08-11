import { Routes, Route } from "react-router-dom";
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
import NotVerified from "@/pages/error/NotVerified";
import NotActivate from "@/pages/error/NotActivate";
import Home from "@/pages/Home";
import ProductsHome from "@/pages/ProductsHome";
import We from "@/pages/About";
import Profile from "@/pages/Profile";
import RequestResetForm from "@/components/auth/RequestResetForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import SendCode from "@/components/auth/SendCode";
import VerifiAccount from "@/components/auth/VerifiAccount";

const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/productos" element={<ProductsHome />} />
      <Route path="/nosotros" element={<We />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/not-verified" element={<NotVerified />} />
      <Route path="/not-activate" element={<NotActivate />} />
      <Route path="/forgot-password" element={<RequestResetForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/send-code" element={<SendCode />} />
      <Route path="/verify-account" element={<VerifiAccount />} />

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

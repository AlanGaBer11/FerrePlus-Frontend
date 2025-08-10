import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "@/services/auth/AuthService";

// Crear el contexto
const AuthContext = createContext();

// Proveedor que contiene la lógica de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(AuthService.isAdmin());
  const [user, setUser] = useState(AuthService.getUserData());
  const [isVerified, setIsVerified] = useState(user?.verified || false);

  // Función para actualizar el estado de autenticación
  const updateAuth = () => {
    setIsLoggedIn(AuthService.isAuthenticated());
    setIsAdmin(AuthService.isAdmin());
    const userData = AuthService.getUserData();
    setUser(userData);
    setIsVerified(userData?.verified || false);
  };

  // Función para cerrar sesión
  const logout = () => {
    AuthService.logout();
    updateAuth();
  };

  // Función para actualizar datos del usuario
  const updateUserData = (newData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...newData,
    }));
  };

  // Inicializar estado
  useEffect(() => {
    // Suscribirse a cambios de autenticación
    const unsubscribe = AuthService.onAuthChange(() => {
      updateAuth();
    });

    // Limpiar al desmontar
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = {
    isLoggedIn,
    isAdmin,
    isVerified,
    user,
    logout,
    updateAuth,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

import { createContext, useContext, useState, useEffect } from "react";
import AuthService from "@/services/auth/AuthService";

// Crear el contexto
const AuthContext = createContext();

// Proveedor que contiene la lógica de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(AuthService.isAdmin());
  const [user, setUser] = useState(AuthService.getUserData());

  // Función para actualizar el estado de autenticación
  const updateAuth = () => {
    setIsLoggedIn(AuthService.isAuthenticated());
    setIsAdmin(AuthService.isAdmin());
    setUser(AuthService.getUserData());
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

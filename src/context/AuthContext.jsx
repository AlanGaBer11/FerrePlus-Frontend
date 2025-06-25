import { createContext, useContext, useState, useEffect } from "react";
import UserService from "../services/users/UserService";

// Crear el contexto
const AuthContext = createContext();

// Proveedor que contiene la lógica de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
  const [user, setUser] = useState(UserService.getUserData());

  // Función para actualizar el estado de autenticación
  const updateAuth = () => {
    setIsLoggedIn(UserService.isAuthenticated());
    setIsAdmin(UserService.isAdmin());
    setUser(UserService.getUserData());
  };

  // Inicializar estado
  useEffect(() => {
    // Suscribirse a cambios de autenticación
    const unsubscribe = UserService.onAuthChange(() => {
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

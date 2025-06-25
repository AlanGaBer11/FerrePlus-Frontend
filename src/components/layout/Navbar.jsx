import { useState, useEffect } from "react";
import "../../styles/Navbar.css";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import UserService from "../../services/users/UserService";

const Navbar = () => {
  // Estado para controlar la autenticación y el usuario
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
  const [userName, setUserName] = useState(UserService.getUserName());
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();

  // Efecto para actualizar el estado cuando cambia la autenticación
  useEffect(() => {
    // Función para actualizar el estado de autenticación
    const checkAuthStatus = () => {
      setIsLoggedIn(UserService.isAuthenticated());
      setIsAdmin(UserService.isAdmin());
      setUserName(UserService.getUserName());
    };

    // Configurar listener para cambios de autenticación
    const unsubscribe = UserService.onAuthChange(() => {
      checkAuthStatus();
    });

    // Limpiar al desmontar
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    UserService.logout();
    navigate("/login");
    setShowUserMenu(false);
  };

  // Función para alternar el menú de usuario
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div>
      <header>
        <nav className="menu">
          <Link to="/">
            <img src={logo} alt="Logo FerrePlus" />
          </Link>
          <Link to="/" className="title-link">
            <h1>FerrePlus</h1>
          </Link>
          <ul className="links">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/products">Productos</Link>
            </li>
            <li>
              <Link to="/suppliers">Proveedores</Link>
            </li>
            <li>
              <Link to="/movements">Movimientos</Link>
            </li>

            {/* Botones de autenticación */}
            {!isLoggedIn ? (
              <li>
                <Link to="/signup">
                  <button>Registrate</button>
                </Link>
              </li>
            ) : (
              <li className="user-menu-container">
                <button className="user-button" onClick={toggleUserMenu}>
                  {userName || "Usuario"}
                  <i className="fi fi-br-angle-down"></i>
                </button>

                {showUserMenu && (
                  <ul className="user-dropdown">
                    <li>
                      <Link to="/profile">Perfil</Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                    )}
                    <li>
                      <button onClick={handleLogout}>Cerrar Sesión</button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

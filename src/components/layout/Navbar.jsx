import { useState } from "react";
import "../../styles/navbar.css";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import UserService from "../../services/users/UserService";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Función para cerrar sesión
  const handleLogout = () => {
    UserService.logout(); // Llama al servicio y actualiza el contexto automáticamente
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

            {!isLoggedIn ? (
              <li>
                <Link to="/signup">
                  <button>Regístrate</button>
                </Link>
              </li>
            ) : (
              <li className="user-menu-container">
                <button className="user-button" onClick={toggleUserMenu}>
                  {user?.name || "Usuario"}
                  <i className="fi fi-br-angle-down"></i>
                </button>

                {showUserMenu && (
                  <ul className="user-dropdown">
                    <li>
                      <Link to="/profile">Perfil</Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
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

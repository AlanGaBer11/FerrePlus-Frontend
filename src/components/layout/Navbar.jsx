import "../../styles/Navbar.css";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Navbar = () => {
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
            <Link to={"/signup"}>
              <button>Registrate</button>
            </Link>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

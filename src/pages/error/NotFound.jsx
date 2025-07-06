import { Link } from "react-router";
import "@/styles/errorPages.css";

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <i className="fi fi-rs-map-marker"></i>
        </div>
        <h1>Error 404</h1>
        <h2>Ruta no encontrada</h2>
        <p>La página que estás buscando no existe o ha sido movida.</p>
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            <i className="fi fi-rs-home"></i>Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

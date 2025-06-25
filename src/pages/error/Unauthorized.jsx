import { Link } from "react-router";
import "../../styles/error/errorPages.css";

const Unauthorized = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <i className="fi fi-rr-lock"></i>
        </div>
        <h1>Error 403</h1>
        <h2>Acceso denegado</h2>
        <p>No tienes permisos para acceder a este módulo.</p>
        <div className="error-actions">
          <Link to="/" className="btn-primary">
            <i className="fi fi-rr-arrow-small-left"></i> Volver atrás
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

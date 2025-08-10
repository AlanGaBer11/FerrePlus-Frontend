import { Link } from "react-router";
import "@/styles/errorPages.css";

const NotActivate = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <i className="fi fi-rr-ban"></i>
        </div>
        <h1>Cuenta Suspendida</h1>
        <h2>Acceso Restringido</h2>
        <p>
          Tu cuenta ha sido suspendida temporalmente. Para reactivarla, por
          favor ponte en contacto con nuestro equipo de soporte.
        </p>
        <div className="error-actions">
          <a
            href="mailto:alangaber11@gmail.com"
            className="btn-primary"
            style={{ marginRight: "1rem" }}
          >
            <i className="fi fi-rr-envelope"></i>
            Contactar Soporte
          </a>
          <Link to="/login" className="btn-secondary">
            <i className="fi fi-rr-arrow-small-left"></i>
            Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotActivate;

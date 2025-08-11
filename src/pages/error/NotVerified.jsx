import { Link } from "react-router-dom";
import "@/styles/errorPages.css";

const NotVerified = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <i className="fi fi-rr-envelope"></i>
        </div>
        <h1>Cuenta No Verificada</h1>
        <h2>Activa tu cuenta</h2>
        <p>
          Para acceder a todos los servicios, necesitas verificar tu cuenta. Por
          favor, revisa tu correo electrónico o solicita un nuevo código de
          verificación.
        </p>
        <div className="error-actions">
          <Link
            to="/send-code"
            className="btn-primary"
            style={{ marginRight: "1rem" }}
          >
            <i className="fi fi-rr-envelope-download"></i>
            Solicitar código
          </Link>
          <Link to="/login" className="btn-secondary">
            <i className="fi fi-rr-arrow-small-left"></i>
            Volver al login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/authForms.css";
import ToastService from "@/services/toast/ToastService";
import AuthService from "@/services/auth/AuthService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  // ESTADO PARA EL FORMULARIO
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShown(!shown);
  };

  // FUNCIÓN PARA MANEJAR LOS CAMBIOS EN LOS CAMPOS DEL FORMULARIO
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // FUNCIÓN PARA MANEJAR EL ENVIO DEL FORMULARIO
  async function submitForm(event) {
    event.preventDefault();

    try {
      setLoading(true);

      // Llamar al servicio de inicio de sesión
      await AuthService.login({
        email: data.email,
        password: data.password,
      });

      ToastService.success("Inicio de sesión exitoso");

      // Redireccionar según el rol del usuario
      if (AuthService.isAdmin()) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      ToastService.error(error.message || "Error al iniciar sesión");
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Inicia Sesión</h1>
      <span>Usa tu correo y contraseña</span>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Correo Electónico</label>
        </div>
        <div className="form-group password-container">
          <input
            type={shown ? "text" : "password"}
            id="password"
            name="password"
            placeholder=""
            onChange={handleChange}
            required
          />

          <label htmlFor="confirm-password">Contraseña</label>
          <span className="toggle-password" onClick={togglePassword}>
            {shown ? (
              <i className="fi fi-rs-crossed-eye eye"></i>
            ) : (
              <i className="fi fi-rs-eye eye"></i>
            )}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
      <div className="link">
        <span>¿No tienes cuenta?</span>
        <Link to="/signup">Crea una</Link>
      </div>
      <div className="link">
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default LoginForm;

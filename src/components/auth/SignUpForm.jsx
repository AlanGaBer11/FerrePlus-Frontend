import { useRef, useState } from "react";
import "../../styles/authForms.css";
import { Link, useNavigate } from "react-router"; // Añadido useNavigate
import ReCAPTCHA from "react-google-recaptcha";
import ToastService from "../../services/toast/ToastService";
import UserService from "../../services/users/UserService"; // Importando UserService

const SignUpForm = () => {
  // LEER VARIABE DE ENTORNO
  const sitekey = import.meta.env.VITE_SITE_KEY;
  const recaptcha = useRef();
  const navigate = useNavigate(); // Para redireccionar después del registro

  // ESTADO PARA EL FORMULARIO Y CARGA
  const [loading, setLoading] = useState(false);
  //ESTADO PARA CONTROLAR VISIBILIDAD DE CONTRASEÑA
  const [shown, setShown] = useState(false);
  // ESTADO PARA LOS CAMPOS DEL FORMULARIO
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // FUNCIÓN PARA MANEJAR LOS CAMBIOS EN LOS CAMPOS DEL FORMULARIO
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // FUNCIÓN PARA VALIDAR LA CONTRASEÑA
  const validatePassword = () => {
    if (data.password !== data.confirmPassword) {
      ToastService.error("Las contraseñas no coinciden");
      return false;
    }
    if (data.password.length < 8) {
      ToastService.error("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    return true;
  };

  // FUNCIÓN PARA TOGGLEAR VISIBILIDAD DE CONTRASEÑA
  const togglePassword = () => {
    setShown(!shown);
  };

  // FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
  async function submitForm(event) {
    event.preventDefault();
    // VALIDAR CAMPOS REQUERIDOS
    // VALIDAR CAPTCHA
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      ToastService.error("Por favor, verifica el reCAPTCHA");
      return;
    }

    // Validar contraseñas
    if (!validatePassword()) {
      return;
    }

    // Preparar datos para envío
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      captcha: captchaValue,
    };

    try {
      setLoading(true);

      // Llamar al servicio de registro
      const response = await UserService.register(userData);

      ToastService.success("Registro exitoso. ¡Bienvenido!");

      // Si el registro incluye el token, podemos guardar la sesión directamente
      if (response.token) {
        UserService.saveToken(response.token, response.user);
        navigate("/dashboard"); // Redirigir a la página principal
      } else {
        // Si no incluye token, redirigir al login
        navigate("/login");
      }
    } catch (error) {
      ToastService.error(error.message || "Error al registrar usuario");
      console.error("Error al registrar:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Registrate</h1>
      <span>Usa tus datos personales para registrarte</span>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Nombre Completo</label>
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Correo Electrónico</label>
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
          <label htmlFor="password">Contraseña</label>
          <span className="toggle-password" onClick={togglePassword}>
            {shown ? (
              <i className="fi fi-rs-crossed-eye eye"></i>
            ) : (
              <i className="fi fi-rs-eye eye"></i>
            )}
          </span>
        </div>
        <div className="form-group password-container">
          <input
            type={shown ? "text" : "password"}
            id="confirm-password"
            name="confirmPassword"
            placeholder=""
            onChange={handleChange}
            required
          />

          <label htmlFor="confirm-password">Confirmar Contraseña</label>
          <span className="toggle-password" onClick={togglePassword}>
            {shown ? (
              <i className="fi fi-rs-crossed-eye eye"></i>
            ) : (
              <i className="fi fi-rs-eye eye"></i>
            )}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        <ReCAPTCHA ref={recaptcha} sitekey={sitekey} />
      </form>
      <div className="link">
        <span>¿Ya tienes cuenta?</span>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default SignUpForm;

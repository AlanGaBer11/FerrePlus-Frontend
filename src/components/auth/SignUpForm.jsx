import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordChecklist from "react-password-checklist";
import "@/styles/authForms.css";
import ToastService from "@/services/toast/ToastService";
import AuthService from "@/services/auth/authService";
import MarkdownDialog from "@/components/MarkdownDialog";

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
    consent: false,
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

    // Validar consentimiento
    if (!data.consent) {
      ToastService.error(
        "Debes ver y aceptar los términos y condiciones para continuar"
      );
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
      await AuthService.register(userData);

      ToastService.success("Registro exitoso. ¡Bienvenido!");
      navigate("/login");
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
        {/* CHECK PASSWORD */}
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={data.password}
          valueAgain={data.confirmPassword}
          messages={{
            minLength: "La contraseña tiene más de 8 caracteres.",
            specialChar: "La contraseña tiene caracteres especiales.",
            number: "La contraseña tiene un número.",
            capital: "La contraseña tiene una letra mayúscula.",
            match: "Las contraseñas coinciden.",
          }}
        />

        {/* CHECKBOX DE CONSENTIMIENTO */}
        <div className="consent-checkbox">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={data.consent}
            onChange={(e) => setData({ ...data, consent: e.target.checked })}
            required
          />
          <label htmlFor="consent" className="consent-label">
            He leído y acepto los{" "}
            <MarkdownDialog
              title="Términos y Condiciones"
              contentPath="terms-conditions"
              triggerElement={
                <span className="text-link">Términos y Condiciones</span>
              }
            />{" "}
            y la{" "}
            <MarkdownDialog
              title="Política de Privacidad"
              contentPath="privacy-policy"
              triggerElement={
                <span className="text-link">Política de Privacidad</span>
              }
            />
          </label>
        </div>

        <ReCAPTCHA ref={recaptcha} sitekey={sitekey} />

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <div className="link">
        <span>¿Ya tienes cuenta?</span>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default SignUpForm;

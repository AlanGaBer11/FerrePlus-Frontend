import { useRef, useState } from "react";
import "../../styles/authForms.css";
import { Link } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";

const SignUpForm = () => {
  // LEER VARIABE DE ENTORNO
  const sitekey = import.meta.env.VITE_SITE_KEY;
  const recaptcha = useRef();
  // ESTADO PARA EL FORMULARIO
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

  // FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
  async function submitForm(event) {
    event.preventDefault();
    alert("Datos enviados");
    console.log("Datos enviados:", data);

    // VALIDAR CAMPOS DEL FORMULARIO
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      // make form submission
      alert("Form submission successful!");
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
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder=""
            onChange={handleChange}
            required
          />
          <label htmlFor="confirm-password">Confirmar Contraseña</label>
        </div>
        <button type="submit">Registrarse</button>
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

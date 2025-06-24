import { useRef, useState } from "react";
import "../../styles/authForms.css";
import { Link } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
  // LEER VARIABE DE ENTORNO
  const sitekey = import.meta.env.VITE_SITE_KEY;
  const recaptcha = useRef();
  // ESTADO PARA EL FORMULARIO
  const [data, setData] = useState({
    email: "",
    password: "",
  });

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
    alert("Datos enviados");
    console.log("Datos enviados:", data);
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
        <button type="submit">Iniciar Sesión</button>
        <ReCAPTCHA ref={recaptcha} sitekey={sitekey} />
      </form>
      <div className="link">
        <span>¿No tienes cuenta?</span>
        <Link to="/signup">Crea una</Link>
      </div>
      <div>
        <a href="#forgot">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default LoginForm;

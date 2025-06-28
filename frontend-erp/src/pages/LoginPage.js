import React, { useState, useRef } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/LoginPage.css";

const RECAPTCHA_SITE_KEY = "6LcMF2MrAAAAAMUMBrE_jrUsG8-_BUTi3CoGwvyd";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA antes de iniciar sesión.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        correo,
        password,
        "recaptcha-token": recaptchaToken,
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Credenciales incorrectas, error de conexión o reCAPTCHA inválido.");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  const handleGoogleLogin = () => {
    // Redirigir directamente al endpoint OAuth2 de Spring Boot
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label>
          <span>Email Address</span>
          <input
            type="email"
            name="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit" type="submit">Sign In</button>
        <div style={{margin: '16px 0', textAlign: 'center'}}>
          <span style={{color: '#888'}}>o</span>
        </div>
        {/* Botón para iniciar sesión con Google (OAuth2) */}
        <button type="button" id="googleLogin" className="submit" style={{background: '#4285F4', color: 'white', marginBottom: '8px'}} onClick={handleGoogleLogin}>
          <img src="/images/google.png" alt="Google" style={{width: 20, marginRight: 8, verticalAlign: 'middle'}} />
          Iniciar sesión con Google
        </button>
        <p className="forgot-pass">Forgot password?</p>
        <div className="social-media">
          <ul>
            <li><img src="/images/facebook.png" alt="facebook" /></li>
            <li><img src="/images/twitter.png" alt="twitter" /></li>
            <li><img src="/images/linkedin.png" alt="linkedin" /></li>
            <li><img src="/images/instagram.png" alt="instagram" /></li>
          </ul>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptcha}
            className="g-recaptcha"
          />
          {error && <div className="recaptcha-warning" style={{ display: "block" }}>{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

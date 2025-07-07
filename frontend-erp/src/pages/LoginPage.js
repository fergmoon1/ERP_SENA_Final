import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import authService from "../services/authService";
import "../styles/LoginPage.css";

const RECAPTCHA_SITE_KEY = "6LcMF2MrAAAAAMUMBrE_jrUsG8-_BUTi3CoGwvyd";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    // Limpiar tokens y cerrar sesión backend al cargar la página de login
    authService.logout();
    
    // Mostrar mensaje de sesión expirada si viene de otra página
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, []); // Solo ejecutar una vez al montar el componente

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
      await authService.login(correo, password, recaptchaToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Credenciales incorrectas, error de conexión o reCAPTCHA inválido.");
      if (recaptchaRef.current) recaptchaRef.current.reset();
      setRecaptchaToken(null);
    }
  };

  const handleGoogleLogin = async () => {
    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA antes de iniciar sesión con Google.");
      return;
    }
    // Redirigir directamente al backend para OAuth2
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
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: '50px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '4px',
                borderRadius: '4px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2563eb'}
              onMouseLeave={(e) => e.target.style.color = '#6b7280'}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </label>
        <button className="submit" type="submit">Sign In</button>
        <div style={{margin: '16px 0', textAlign: 'center'}}>
          <span style={{color: '#888'}}>o</span>
        </div>
        {/* Botón para iniciar sesión con Google (OAuth2) */}
        <button type="button" id="googleLogin" className="submit" style={{background: '#4285F4', color: 'white', marginBottom: '8px'}} onClick={handleGoogleLogin} disabled={!recaptchaToken}>
          <i className="fab fa-google" style={{marginRight: 8, fontSize: '18px'}}></i>
          Iniciar sesión con Google
        </button>
        <p className="forgot-pass">Forgot password?</p>
        <div className="social-media">
          <ul>
            <li><i className="fab fa-facebook" style={{fontSize: '24px', color: '#1877f2'}}></i></li>
            <li><i className="fab fa-twitter" style={{fontSize: '24px', color: '#1da1f2'}}></i></li>
            <li><i className="fab fa-linkedin" style={{fontSize: '24px', color: '#0077b5'}}></i></li>
            <li><i className="fab fa-instagram" style={{fontSize: '24px', color: '#e4405f'}}></i></li>
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

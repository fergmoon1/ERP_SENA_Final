import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/LoginPage.css";

const RECAPTCHA_SITE_KEY = "6LcMF2MrAAAAAMUMBrE_jrUsG8-_BUTi3CoGwvyd";

const LoginPage = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    // Limpiar tokens y cerrar sesión backend al cargar la página de login
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    fetch("/logout", { method: "POST", credentials: "include" }).catch(() => {});
  }, []);

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
      
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      
      // Obtener información del usuario
      try {
        const userResponse = await axios.get("http://localhost:8081/api/auth/me", {
          headers: {
            'Authorization': `Bearer ${response.data.token}`
          }
        });
        localStorage.setItem("user", JSON.stringify(userResponse.data));
      } catch (userError) {
        console.error("Error obteniendo información del usuario:", userError);
      }
      
      window.location.href = "/dashboard";
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
    // Redirigir directamente a OAuth2 sin verificar reCAPTCHA en backend
    // El reCAPTCHA ya está validado en frontend
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

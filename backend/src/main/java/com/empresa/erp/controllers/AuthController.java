package com.empresa.erp.controllers;

import com.empresa.erp.services.AuthService;
import com.empresa.erp.models.RefreshToken;
import com.empresa.erp.repositories.RefreshTokenRepository;
import com.empresa.erp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.security.core.Authentication;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.HashMap;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String correo = body.get("correo");
        String password = body.get("password");
        return authService.loginWithRefresh(correo, password);
    }

    @PostMapping("/refresh")
    public Map<String, String> refresh(@RequestBody Map<String, String> body) {
        String refreshTokenStr = body.get("refreshToken");
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr)
            .orElseThrow(() -> new RuntimeException("Refresh token inválido"));
        if (refreshToken.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Refresh token expirado");
        }
        // Generar nuevo JWT usando el método específico para refresh
        return authService.refreshTokens(refreshToken.getUsuario());
    }

    @PostMapping("/logout")
    public Map<String, String> logout(@RequestBody Map<String, String> body) {
        String refreshTokenStr = body.get("refreshToken");
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr)
            .orElseThrow(() -> new RuntimeException("Refresh token inválido"));
        refreshTokenRepository.delete(refreshToken);
        return Map.of("message", "Logout exitoso");
    }

    @GetMapping("/me")
    public com.empresa.erp.models.Usuario getCurrentUser(Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("No hay autenticación disponible");
        }
        
        String correo = authentication.getName();
        
        return usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }



    @PostMapping("/verify-recaptcha")
    public Map<String, Object> verifyRecaptcha(@RequestBody Map<String, String> body, HttpSession session) {
        String recaptchaToken = body.get("recaptchaToken");
        String secret = "6LcMF2MrAAAAAMUMBrE_jrUsG8-_BUTi3CoGwvyd"; // Cambia por tu clave secreta real
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.google.com/recaptcha/api/siteverify";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        Map<String, String> params = new HashMap<>();
        params.put("secret", secret);
        params.put("response", recaptchaToken);
        HttpEntity<Map<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url + "?secret=" + secret + "&response=" + recaptchaToken, null, Map.class);
        Map<String, Object> bodyResp = response.getBody();
        boolean success = (Boolean) bodyResp.getOrDefault("success", false);
        if (success) {
            session.setAttribute("recaptcha_verified", true);
            return Map.of("success", true);
        } else {
            return Map.of("success", false, "error", bodyResp.get("error-codes"));
        }
    }

    // Endpoint temporal para generar hashes BCrypt
    @PostMapping("/generate-hash")
    public Map<String, String> generateHash(@RequestBody Map<String, String> body) {
        String password = body.get("password");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode(password);
        
        return Map.of(
            "password", password,
            "hash", hash,
            "message", "Hash BCrypt generado correctamente"
        );
    }
} 
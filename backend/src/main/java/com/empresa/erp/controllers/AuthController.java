package com.empresa.erp.controllers;

import com.empresa.erp.services.AuthService;
import com.empresa.erp.models.RefreshToken;
import com.empresa.erp.repositories.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

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
} 
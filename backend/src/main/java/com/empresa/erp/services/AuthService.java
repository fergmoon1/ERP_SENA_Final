package com.empresa.erp.services;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.empresa.erp.models.RefreshToken;
import com.empresa.erp.repositories.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.Map;
import java.util.Date;
import java.util.Optional;
import java.security.Key;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${jwt.secret:mysecretkey}")
    private String jwtSecret;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public String login(String correo, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
        Usuario usuario = usuarioOpt.get();
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
        // Adaptación JJWT 0.11.x
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.builder()
                .setSubject(usuario.getCorreo())
                .claim("rol", usuario.getRol())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Map<String, String> loginWithRefresh(String correo, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
        Usuario usuario = usuarioOpt.get();
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }
        return generateTokens(usuario);
    }

    public Map<String, String> refreshTokens(Usuario usuario) {
        return generateTokens(usuario);
    }

    private Map<String, String> generateTokens(Usuario usuario) {
        // Generar JWT
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        String jwt = Jwts.builder()
                .setSubject(usuario.getCorreo())
                .claim("rol", usuario.getRol())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        // Generar refresh token
        String refreshTokenStr = UUID.randomUUID().toString();
        LocalDateTime expiry = LocalDateTime.now().plusDays(7); // 7 días de validez
        // Eliminar refresh tokens anteriores del usuario
        refreshTokenRepository.deleteByUsuario(usuario);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(refreshTokenStr);
        refreshToken.setUsuario(usuario);
        refreshToken.setExpiryDate(expiry);
        refreshTokenRepository.save(refreshToken);
        return Map.of("token", jwt, "refreshToken", refreshTokenStr);
    }
} 
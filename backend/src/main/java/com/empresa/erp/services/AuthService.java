package com.empresa.erp.services;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
} 
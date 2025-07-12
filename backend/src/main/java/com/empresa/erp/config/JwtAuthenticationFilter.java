package com.empresa.erp.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Value("${jwt.secret:mysecretkey}")
    private String jwtSecret;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // Saltarse el procesamiento JWT solo para endpoints de login, OAuth2 y pruebas
        if (request.getRequestURI().equals("/api/auth/login") || 
            request.getRequestURI().equals("/api/auth/refresh") ||
            request.getRequestURI().startsWith("/oauth2/") ||
            request.getRequestURI().startsWith("/login/oauth2/") ||
            request.getRequestURI().startsWith("/oauth/") ||
            request.getRequestURI().startsWith("/api/test/")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
                Jws<Claims> claimsJws = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token);
                Claims claims = claimsJws.getBody();
                String username = claims.getSubject();
                String rol = claims.get("rol", String.class);
                logger.info("JWT recibido para usuario: {} con rol: {}", username, rol);
                if (username != null && rol != null) {
                    String springRole = rol.startsWith("ROLE_") ? rol : ("ROLE_" + rol);
                    logger.info("Asignando autoridad: {}", springRole);
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(springRole);
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(username, null, Collections.singletonList(authority));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } else {
                    logger.warn("Token JWT sin username o rol válido");
                }
            } catch (Exception e) {
                logger.error("Error al validar el token JWT: {}", e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }
        filterChain.doFilter(request, response);
    }
} 
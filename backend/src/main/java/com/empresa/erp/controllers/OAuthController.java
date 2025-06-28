package com.empresa.erp.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
import com.empresa.erp.models.Usuario;
import com.empresa.erp.services.AuthService;
import com.empresa.erp.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    private static final Logger logger = LoggerFactory.getLogger(OAuthController.class);

    @Autowired
    private AuthService authService;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/success")
    public RedirectView oauthSuccess(@AuthenticationPrincipal OAuth2User oauth2User) {
        // Aquí puedes procesar la información del usuario OAuth2
        // Por ejemplo, crear o actualizar el usuario en tu base de datos
        
        // Redirigir al frontend React
        return new RedirectView("http://localhost:3000/dashboard");
    }

    @GetMapping("/failure")
    public RedirectView oauthFailure() {
        // Redirigir al frontend en caso de fallo
        return new RedirectView("http://localhost:3000/login?error=oauth_failed");
    }

    // Endpoint estándar de Spring Boot OAuth2
    @GetMapping("/login/oauth2/code/google")
    public RedirectView handleGoogleCallback(@AuthenticationPrincipal OAuth2User oauth2User) {
        logger.info("Entrando a handleGoogleCallback (GET) - oauth2User: {}", oauth2User);
        if (oauth2User != null) {
            String email = oauth2User.getAttribute("email");
            String nombre = oauth2User.getAttribute("name");
            logger.info("Usuario autenticado por Google: {} - {}", nombre, email);
            // Buscar o crear usuario local
            Usuario usuario = usuarioService.findAll().stream()
                .filter(u -> u.getCorreo().equalsIgnoreCase(email))
                .findFirst()
                .orElseGet(() -> {
                    Usuario nuevo = new Usuario();
                    nuevo.setCorreo(email);
                    nuevo.setNombre(nombre);
                    nuevo.setRol("USER");
                    nuevo.setPassword(""); // Sin password local
                    logger.info("Creando nuevo usuario local para {}", email);
                    return usuarioService.save(nuevo);
                });
            Map<String, String> tokens = authService.generateTokens(usuario);
            String jwt = tokens.get("token");
            String refreshToken = tokens.get("refreshToken");
            logger.info("Redirigiendo a dashboard con token y refreshToken");
            return new RedirectView("http://localhost:3000/dashboard?token=" + jwt + "&refreshToken=" + refreshToken);
        } else {
            logger.warn("oauth2User es null, redirigiendo a login con error");
            return new RedirectView("http://localhost:3000/login?error=oauth_failed");
        }
    }

    @PostMapping("/login/oauth2/code/google")
    public RedirectView handleGoogleCallbackPost(@AuthenticationPrincipal OAuth2User oauth2User) {
        logger.info("Entrando a handleGoogleCallback (POST) - oauth2User: {}", oauth2User);
        return handleGoogleCallback(oauth2User);
    }
} 
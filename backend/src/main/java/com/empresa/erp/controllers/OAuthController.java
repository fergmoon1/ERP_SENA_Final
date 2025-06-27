package com.empresa.erp.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

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
        if (oauth2User != null) {
            // Login exitoso - procesar usuario y redirigir
            return new RedirectView("http://localhost:3000/dashboard");
        } else {
            // Login fallido
            return new RedirectView("http://localhost:3000/login?error=oauth_failed");
        }
    }
} 
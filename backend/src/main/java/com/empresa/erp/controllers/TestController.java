package com.empresa.erp.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @GetMapping("/oauth-status")
    public Map<String, Object> getOAuthStatus() {
        Map<String, Object> status = new HashMap<>();
        
        try {
            ClientRegistration googleRegistration = clientRegistrationRepository.findByRegistrationId("google");
            if (googleRegistration != null) {
                status.put("oauthConfigured", true);
                status.put("clientId", googleRegistration.getClientId());
                status.put("redirectUri", googleRegistration.getRedirectUri());
                status.put("scopes", googleRegistration.getScopes());
            } else {
                status.put("oauthConfigured", false);
                status.put("error", "No se encontró la configuración de Google OAuth");
            }
        } catch (Exception e) {
            status.put("oauthConfigured", false);
            status.put("error", e.getMessage());
        }
        
        status.put("timestamp", System.currentTimeMillis());
        return status;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Backend funcionando correctamente");
        return response;
    }

    @GetMapping("/public")
    public Map<String, String> publicEndpoint() {
        return Map.of(
            "message", "Este es un endpoint público",
            "access", "Sin autenticación requerida"
        );
    }

    @GetMapping("/protected")
    public Map<String, String> protectedEndpoint() {
        return Map.of(
            "message", "Este es un endpoint protegido",
            "access", "Requiere autenticación JWT"
        );
    }
} 
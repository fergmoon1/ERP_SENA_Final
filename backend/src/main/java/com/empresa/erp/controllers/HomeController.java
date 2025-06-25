package com.empresa.erp.controllers;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        return Map.of(
            "message", "API ERP SENA",
            "status", "Activo",
            "timestamp", LocalDateTime.now(),
            "endpoints", Map.of(
                "health", "/api/test/health",
                "login", "/api/auth/login",
                "productos", "/api/productos",
                "usuarios", "/api/usuarios",
                "reportes", "/api/reportes"
            ),
            "documentation", "Usa Postman o cualquier cliente HTTP para probar los endpoints"
        );
    }

    @GetMapping("/api")
    public Map<String, Object> apiInfo() {
        return Map.of(
            "name", "ERP SENA API",
            "version", "1.0.0",
            "description", "API REST para sistema ERP",
            "baseUrl", "/api",
            "authentication", "JWT Bearer Token",
            "endpoints", Map.of(
                "auth", "/api/auth/**",
                "test", "/api/test/**",
                "productos", "/api/productos/**",
                "usuarios", "/api/usuarios/**",
                "pedidos", "/api/pedidos/**",
                "clientes", "/api/clientes/**",
                "reportes", "/api/reportes/**"
            )
        );
    }
} 
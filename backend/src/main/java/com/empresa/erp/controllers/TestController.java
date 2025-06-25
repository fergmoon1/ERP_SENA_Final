package com.empresa.erp.controllers;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "OK",
            "timestamp", LocalDateTime.now(),
            "message", "Backend ERP funcionando correctamente",
            "version", "1.0.0"
        );
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
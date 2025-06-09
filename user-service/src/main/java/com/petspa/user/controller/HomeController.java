package com.petspa.user.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "¡Bienvenido al User Service de Pet Spa!");
        response.put("version", "1.0.0");
        response.put("description", "Servicio de gestión de usuarios y citas");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("users", "/api/users - Gestión de usuarios");
        endpoints.put("appointments", "/api/appointments - Gestión de citas");
        endpoints.put("h2-console", "/h2-console - Consola de base de datos H2");
        
        response.put("endpoints", endpoints);
        response.put("status", "running");
        response.put("port", 8081);
        
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Pet Spa User Service");
        return response;
    }
} 
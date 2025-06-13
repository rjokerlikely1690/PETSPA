package com.petspa.appforpets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "¡Bienvenido a Pet Spa Management System!");
        response.put("version", "1.0.0");
        response.put("description", "Sistema de gestión para spa de mascotas");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("pets", "/api/pets - Gestión de mascotas");
        endpoints.put("events", "/api/events - Gestión de eventos del calendario");
        endpoints.put("users", "http://localhost:8081/api/users - Gestión de usuarios");
        endpoints.put("appointments", "http://localhost:8081/api/appointments - Gestión de citas");
        endpoints.put("frontend", "http://localhost:5173 - Aplicación web frontend");
        
        response.put("endpoints", endpoints);
        response.put("status", "running");
        
        return response;
    }

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Pet Spa Main Service");
        return response;
    }
} 
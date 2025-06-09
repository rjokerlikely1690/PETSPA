package com.petspa.appforpets.controller;

import com.petspa.appforpets.model.Appointment;
import com.petspa.appforpets.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) {
        log.debug("Creating appointment: {}", appointment);
        try {
            Appointment created = appointmentService.createAppointment(appointment);
            log.debug("Created appointment: {}", created);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating appointment: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        log.debug("Getting appointments for date: {}", date);
        return ResponseEntity.ok(appointmentService.getAppointmentsByDate(date));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Appointment>> searchAppointments(@RequestParam String ownerName) {
        log.debug("Searching appointments for owner: {}", ownerName);
        return ResponseEntity.ok(appointmentService.searchAppointmentsByOwner(ownerName));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        log.debug("Getting appointment by id: {}", id);
        try {
            return ResponseEntity.ok(appointmentService.getAppointmentById(id));
        } catch (Exception e) {
            log.error("Error getting appointment {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody Appointment appointment) {
        log.debug("Updating appointment {}: {}", id, appointment);
        try {
            return ResponseEntity.ok(appointmentService.updateAppointment(id, appointment));
        } catch (Exception e) {
            log.error("Error updating appointment {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        log.debug("Deleting appointment: {}", id);
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Error deleting appointment {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 
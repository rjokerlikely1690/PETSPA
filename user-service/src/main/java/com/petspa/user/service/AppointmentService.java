package com.petspa.user.service;

import com.petspa.user.model.Appointment;
import com.petspa.user.repository.AppointmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByDate(date);
    }

    @Transactional(readOnly = true)
    public List<Appointment> searchAppointmentsByOwner(String ownerName) {
        return appointmentRepository.findByOwnerNameContainingIgnoreCase(ownerName);
    }

    @Transactional(readOnly = true)
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
    }

    @Transactional
    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = getAppointmentById(id);
        
        appointment.setPetName(appointmentDetails.getPetName());
        appointment.setOwnerName(appointmentDetails.getOwnerName());
        appointment.setService(appointmentDetails.getService());
        appointment.setDate(appointmentDetails.getDate());
        appointment.setTime(appointmentDetails.getTime());
        appointment.setNotes(appointmentDetails.getNotes());
        appointment.setStatus(appointmentDetails.getStatus());

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Appointment not found");
        }
        appointmentRepository.deleteById(id);
    }
} 
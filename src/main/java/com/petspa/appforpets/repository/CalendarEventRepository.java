package com.petspa.appforpets.repository;

import com.petspa.appforpets.model.CalendarEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long> {
    List<CalendarEvent> findByPetId(Long petId);
    List<CalendarEvent> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<CalendarEvent> findByPetIdAndStartTimeBetween(Long petId, LocalDateTime start, LocalDateTime end);
} 
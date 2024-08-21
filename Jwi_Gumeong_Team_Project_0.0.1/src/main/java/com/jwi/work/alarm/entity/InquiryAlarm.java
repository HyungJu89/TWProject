package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "inquiry")
public class InquiryAlarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inquiryKey;

    @ManyToOne
    @JoinColumn(name = "userKey", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 30)
    private String title;

    @Column(name = "category", nullable = false, length = 30)
    private String category;

    @Column(name = "details", nullable = false)
    private String details;

    @Column(name = "image")
    private String image;

    @Column(name = "createdAt", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updatedAt", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

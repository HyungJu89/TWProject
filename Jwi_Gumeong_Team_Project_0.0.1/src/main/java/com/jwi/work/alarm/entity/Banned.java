package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "banned")
public class Banned {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bannedKey;

    @ManyToOne
    @JoinColumn(name = "userKey", nullable = false)
    private UserAlarmEntity user;  // User 엔티티와의 연관관계 설정

    @Column(name = "reason", nullable = false, length = 50)
    private String reason;

    @Column(name = "reasonDate", nullable = false)
    private LocalDateTime reasonDate;

    @Column(name = "date", nullable = false)
    private int date;

    @Column(name = "state", nullable = false, length = 50)
    private String state = "activate";

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

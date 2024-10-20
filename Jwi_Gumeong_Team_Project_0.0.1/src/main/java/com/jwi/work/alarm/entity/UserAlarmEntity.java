package com.jwi.work.alarm.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "user")
public class UserAlarmEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userKey;

    @Column(name = "email", nullable = false, length = 30, unique = true)
    private String email;

    @Column(name = "pw", nullable = false, length = 255)
    private String pw;

    @Column(name = "nickName", nullable = false, length = 30, unique = true)
    private String nickName;

    @Column(name = "gender", nullable = false, length = 30)
    private String gender = "비밀";

    @Column(name = "birthday")
    private LocalDateTime birthday;

    @Column(name = "state", nullable = false, length = 30)
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

    public String getPw() {
        return null;
    }
    
}

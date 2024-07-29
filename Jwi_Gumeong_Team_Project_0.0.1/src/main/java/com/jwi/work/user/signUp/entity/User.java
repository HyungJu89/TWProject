package com.jwi.work.user.signUp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Data
@Table(name = "user")
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userKey")
    private int userKey;

    @Column(name = "email", nullable = false, unique = true, length = 30)
    private String email;

    @Column(name = "pw", nullable = false, length = 255)
    private String password;

    @Column(name = "nickName", nullable = false, unique = true, length = 30)
    private String nickName;

    @Column(name = "gender", nullable = false, length = 30)
    private String gender;

    @Column(name = "birthday")
    private LocalDateTime birthday;

    @Column(name = "state", nullable = false, length = 30)
    private String state = "activated";

    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt", nullable = false)
    private LocalDateTime updatedAt;

}
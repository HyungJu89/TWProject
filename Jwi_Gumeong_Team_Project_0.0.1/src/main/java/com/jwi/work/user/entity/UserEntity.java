package com.jwi.work.user.entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userKey;

    private String email;
    private String pw;
    private String nickName;
    private String gender;
    private Date birthday;
    private String state;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
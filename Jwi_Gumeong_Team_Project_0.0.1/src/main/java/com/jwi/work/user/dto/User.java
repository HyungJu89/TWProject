package com.jwi.work.user.dto;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
public class User {

    private Integer userKey;

    private String email;

    private String password;

    private String nickName;

    private String gender;

    private LocalDateTime birthday;

    private String state;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
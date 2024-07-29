package com.jwi.work.user.dto;
import java.time.LocalDateTime;

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
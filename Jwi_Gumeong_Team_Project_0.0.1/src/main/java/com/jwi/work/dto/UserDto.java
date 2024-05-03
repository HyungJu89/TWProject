package com.jwi.work.dto;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private String userEmail;
    private String userPw;
    private String userName;
    private Character userGender;
    private Integer userAge;
    private boolean userBlind;
    private LocalDateTime userCreatedAt;
    private LocalDateTime userUpdatedAt;
}
package com.jwi.work.dto.userDto;

import lombok.Data;

@Data
public class UserDto {
    private String userEmail;
    private String userPw;
    private String userName;
    private Character userGender;
    private Integer userAge;

}
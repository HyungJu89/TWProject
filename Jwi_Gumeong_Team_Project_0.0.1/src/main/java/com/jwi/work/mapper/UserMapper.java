package com.jwi.work.mapper;

import com.jwi.work.dto.userDto.UserDto;

public interface UserMapper {
	public void signUp(UserDto dto);
	public int userCheck(UserDto dto);
}

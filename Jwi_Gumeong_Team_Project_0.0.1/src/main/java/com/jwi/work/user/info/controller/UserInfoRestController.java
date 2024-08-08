package com.jwi.work.user.info.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.info.service.UserService;

@RestController
@RequestMapping("/user")
public class UserInfoRestController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/key")
	public Map<String, String> getUserKey(@RequestParam("sessionId") String sessionId) {
		int num = userService.selectUserKey(sessionId);
		
		Map<String, String> result = new HashMap<>();
		
		if(num == 0) {
			result.put("result", "fail");
		} else {
			result.put("result", "success");
		}
		
		return result;
	}
}

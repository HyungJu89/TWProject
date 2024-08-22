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
	public Map<String, Object> getUserKey(@RequestParam("sessionId") String sessionId) {

		int num = userService.selectUserKey(sessionId);
		
		Map<String, Object> result = new HashMap<>();
		
		if(num == 0) {
			result.put("result", "fail");
		} else {
			result.put("result", "success");
			result.put("userKey", num);
		}
		
		return result;
	}
	
	@PostMapping("/email")
	public Map<String, String> getUserEmail(@RequestParam("userKey") int userKey) {
		String email = userService.selectUserEmail(userKey);
		
		Map<String, String> result = new HashMap<>();
		
		if(!email.equals(null) || !email.equals("")) {
			result.put("result", "success");
			result.put("email", email);
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
}

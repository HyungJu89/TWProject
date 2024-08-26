package com.jwi.work.user.resign.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.resign.service.ResignService;

@RestController
@RequestMapping("/user/account")
public class ResignRestController {
	
	@Autowired
	private ResignService resignService;
	
	@PostMapping("/resign")
	public Map<String, String> resignUser(@RequestParam("userKey") int userKey) {
		
		int count = resignService.resignUser(userKey);
		
		Map<String, String> result = new HashMap<>();
		
		if(count == 1) {
			result.put("result", "success");
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
	
}

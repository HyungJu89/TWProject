package com.jwi.work.center.sanction.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.center.sanction.dto.SanctionDTO;
import com.jwi.work.center.sanction.service.SanctionService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/sanction")
public class SanctionRestController {

	private SanctionService sanctionService;
	
	@PostMapping("/list")
	public Map<String, Object> getBannedlist(@RequestParam("userKey") int userKey) {
		List<SanctionDTO> list = sanctionService.getList(userKey);
		Map<String, Object> result = new HashMap<>();
		
		if(list != null) {
			result.put("result", "success");
			result.put("sanctionList", list);
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
}

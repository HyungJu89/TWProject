package com.jwi.work.center.faq.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.center.faq.entity.Faq;
import com.jwi.work.center.faq.service.FaqService;

@RequestMapping("/faq")
@RestController
public class FaqRestController {
	
	@Autowired
	private FaqService faqService;
	
	@GetMapping("/list")
	public Map<String, Object> faqList() {
		List<Faq> faqList = faqService.findFaqList();
		
		Map<String, Object> result = new HashMap<>();
		
		if(faqList != null) {
			result.put("result", "success");
			result.put("list", faqList);
		} else {
			result.put("result", "fail");
		}
		
		return result;
	}
}

package com.jwi.work.user.pwInquiry.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.User;
import com.jwi.work.user.pwInquiry.service.PwInquiryService;

@RestController
public class PwInquiryController {
	
	@Autowired
	private PwInquiryService pwInquiryService;
	@PostMapping("/issuedPw")
	public String issuedPw(@RequestBody User userData) {
		System.out.println("들어오니?");
		return pwInquiryService.pwIssued(userData.getEmail());
	}
}

package com.jwi.work.api.chzzkApi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.api.chzzkApi.service.PartnersApiService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/partnersLiveApi/*")
@AllArgsConstructor
public class PartnersApiController {
	
	@Autowired
	private  PartnersApiService PartnersApiService;
	
	@GetMapping("/")
	public Object PartnersLive() {
		return PartnersApiService.PartnersLiveInfo();
	};
	
}

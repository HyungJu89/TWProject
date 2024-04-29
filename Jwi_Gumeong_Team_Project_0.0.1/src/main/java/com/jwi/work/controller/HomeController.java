package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.jwi.work.service.JwiService;
@Controller
public class HomeController {
	@Autowired
	private JwiService service;
	@GetMapping("/")
	public String board(Model model) {
//	System.out.println(service.test());
//	model.addAttribute("test",service.test());
	return "home";
	}
}

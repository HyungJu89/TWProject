package com.jwi.work.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jwi.work.service.JwiService;


@Controller
@RequestMapping("/board/*")
public class JwiController {
	@Autowired
	private JwiService service;
	@GetMapping("/SignUp")
	public void SignUp(Model model) {

	}


}
 
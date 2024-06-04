
/*
 * 
 * 
 * 
 * 메인(HOME) 컨트롤러
 * 
 * 
 * 
 * */

package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//운영자는 URL /admin/**
//관리자 URL /manager/**
//유저 URL /user/**
//로그인페이지 URL  /login

//Tip : @RestController = @Controller + @ResponseBody 그치만 데이터를 전송시키려면 리스폰스 바디가 필요한걸... ㅠㅠ
//@Controller
@RequestMapping("/babo")
@RestController
public class HomeController {

	@GetMapping("/")
	public String board(Model model) {
	return "gd";
	}
	
	@GetMapping("/jieun")
	@ResponseBody
	public String test() {
		return "나도 저번에 누나가 말한 바퀴벌레 나옴 근데 이시기에 한두마리씩 꼭 보여 큰놈 나 이거 라이브쇼했음 어케했냐면 재열+지은+나 에이펙스라는 게임하고있었는데 스산한 느낌이 나더니 갑자기 바퀴벌레 나와서 '님들 큰일남' 바퀴벌레 존나큰거나옴 이랬음 ㅋㅋㅋㅋㅋㅋㅋ";
	}
	@GetMapping("/hyungju")
	@ResponseBody
	public String 형주() {
		return "남희누나 손절 안할꺼지?";
	}
}

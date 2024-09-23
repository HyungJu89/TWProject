package com.jwi.work.user.myPage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jwi.work.user.dto.CheckDto;
import com.jwi.work.user.dto.User;
import com.jwi.work.user.entity.FavoritesEntity;
import com.jwi.work.user.myPage.service.MyPageService;

@RestController
@RequestMapping("/myPage/*")
public class MyPageController {
	@Autowired
	private MyPageService myPageService;
	
	//로그인체크
	@PostMapping("/loginRetry")
	public CheckDto loginRetry(@RequestBody User userData) {
		return myPageService.loginRetry(userData);
	}
	
	//로그인체크
	@PostMapping("/edit")
	public CheckDto edit(@RequestBody User userData) {
		return myPageService.userEdit(userData);
	}
	
	//즐겨찾기 관리
	@GetMapping("/favorites")
	public List<FavoritesEntity> userFavoritesList(@RequestParam("sessionId") String sessionId) {
		System.out.println(sessionId);
		return myPageService.favoritesList(sessionId);
		
	}
	
}

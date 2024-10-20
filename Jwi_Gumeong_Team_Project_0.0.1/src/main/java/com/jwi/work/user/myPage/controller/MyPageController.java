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
	
	//비밀번호 수정
	@PostMapping("/editPw")
	public CheckDto editPw(@RequestBody User userData) {
		return myPageService.userEditPw(userData);
	}
	
	//닉네임 수정
	@PostMapping("/editNickName")
	public CheckDto editNickName(@RequestBody User userData) {
		return myPageService.userEditNickName(userData);
	}
	
	//전체 수정
	@PostMapping("/editAll")
	public CheckDto editAll(@RequestBody User userData) {
		return myPageService.userEditAll(userData);
	}
	
	//즐겨찾기 관리
	@GetMapping("/favorites")
	public List<FavoritesEntity> userFavoritesList(@RequestParam("sessionId") String sessionId) {
		return myPageService.favoritesList(sessionId);
		
	}
	//채널별 즐겨찾기 카운트
	@GetMapping("/favoritesCount")
	public int favoritesCount(@RequestParam("channelKey") int channelKey) {
		return myPageService.favoritesCount(channelKey);
		
	}
	
}

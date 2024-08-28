package com.jwi.work.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jwi.work.admin.service.AdminService;
import com.jwi.work.alarm.entity.Report;
import com.jwi.work.center.inquiry.entity.Inquiry;
import com.jwi.work.center.inquiry.entity.InquiryResponse;
import com.jwi.work.center.sanction.entity.Sanction;
import com.jwi.work.user.dto.User;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService adminService;
	
	// 로그인시 작동
	@PostMapping("/login")
	public String adminLogin(@RequestBody Map<String,String> data , HttpServletResponse response){
		// 쿠키설정
		var cookie = new Cookie("jwt" , adminService.loginJWT(data));
		cookie.setMaxAge(1800);
		// 쿠키를 외부로 조작하는걸 힘들게 만들어줌
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		return adminService.loginJWT(data);
	}
	
	// 처음에 코드 입력하게 한 다음에 그거 필터 통해서 내부 코드랑 비교하고 jwt 발급하는것도 괜찮은 방법일꺼같다.
	// 그러면 첫 코드 + 로그인시 코드 2중 필터이기떄문에 안전할꺼같음
	// 08.15
	// 회원관리 관련 만들 예정
	// 회원정보 JPA로 전부 호출 및 로그인 로그 호출하는거 보여주는쪽 만들어놓으면 좋을듯
	
	// 모든 유저 정보 찾기
	// 페이징처리 안함 2024-08-20 기준
	@GetMapping("/findAllUser")
	public List<User> findUser() {
		return adminService.findAllUsers();
	}
	
	// 모든 문의 찾기
	// 페이징처리 안함 2024-08-20 기준
	@GetMapping("/findInquiryAll")
	public List<Inquiry> findInquiry(){
		return adminService.selectInquiry();
	}
	
	// 모든 답장 불러오기
	@GetMapping("/findInquiryResponseAll") 
	public List<InquiryResponse> findInquiryResponse(){
		return adminService.selectInquiryResponse();
	}
	
	// 모든 밴 목록 불러오기
	@GetMapping("/findAllSanction")
	public List<Sanction> findAllSanction(){
		return adminService.selectSanction();
	}
	
	// 신고목록 전부 호출
	@GetMapping("/report")
	public List<Report> findReportAll(){
		return adminService.selectReport();
	}
	
	// 받아온 유저 밴 하기
	@PostMapping("/banndUser")
	public void banndUser(@RequestBody Map<String,String> userData) {
		adminService.banndUser(userData);
	}
	
	// 받아온 유저 밴 되돌리기
	@GetMapping("/revertBan")
	public void revertBan(@RequestParam("userKey") int userKey) {
		adminService.revertBan(userKey);
	}
	
	@PostMapping("/inquiryResp")
	public Map<String, Object> createInquiryResponse(@RequestParam("inquiryKey") int inquiryKey,@RequestParam("responseText") String responseText,@RequestParam(value = "files" , required = false) List<MultipartFile> files ) {
		String result = adminService.createInquiryResponse(inquiryKey, responseText, files);
		Map<String, Object> response = new HashMap<>();
		response.put("result", result);
		return response;
	}
	
}
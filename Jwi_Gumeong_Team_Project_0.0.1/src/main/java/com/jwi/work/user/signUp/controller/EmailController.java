package com.jwi.work.user.signUp.controller;
import com.jwi.work.user.signUp.service.EmailService;

import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }
    //회원가입
    @GetMapping("/certification")
    public String sendEmail(@RequestParam("email") String email) {
    	String checkNum;
    	checkNum = UUID.randomUUID().toString().replaceAll("-", "").substring(0,8);
        emailService.EmailCheck(email,checkNum);
        return checkNum;
    }
    //비밀번호 찾기
    @GetMapping("/certification2")
    public String sendEmail2(@RequestParam("email") String email) {
    	String checkNum;
    	checkNum = UUID.randomUUID().toString().replaceAll("-", "").substring(0,8);
        emailService.EmailCheck2(email,checkNum);
        return checkNum;
    }
}
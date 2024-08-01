package com.jwi.work.user.signUp.controller;
import com.jwi.work.user.signUp.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/sendEmail")
    public String sendEmail() {
//        emailService.sendSimpleEmail("dsfs3975@naver.com", "안녕하세요 김형주입니다.", "살려주세요.");
        return "Email sent successfully";
    }
}
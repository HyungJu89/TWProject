package com.jwi.work.user.signUp.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }
    //이메일 보내는 로직
    //application.yml파일에 적혀있는 이메일문자열을 가지고왔어요
    // alt + shift + r 변수 일괄변경
    @Value("${spring.mail.username}")
    private String from;
    public void sendEmail(String to, String subject, String text) {
    	MimeMessage message = javaMailSender.createMimeMessage();
    	
    	try {
    		MimeMessageHelper helper = new MimeMessageHelper(message,true);
    		helper.setTo(to);
    		helper.setSubject(subject);
    		helper.setText(text, true);
    	} catch (MessagingException e) {
    		e.printStackTrace();
    	}
    	
        javaMailSender.send(message);
    }
    //이메일 인증 형식
    //과제: 인증번호를 랜덤으로 돌린걸 여기서 보내고, 그걸 또 axios로 저기서 state로 받아서 대조하고 확인해야함
//    public static String CheckNum() {
//    	//UUID = 고유한 번호를 만들어내는 코드 randomUUID = 그걸 랜덤으로 만들어냄. toString = 문자열로전환 replaceAll = uuid에서 만들어 낸거는 -가 붙기때문에 replaceALL로 전부 공백으로 전환.그리고 substring은 10자로 끊어줌
//    	return UUID.randomUUID().toString().replaceAll("-", "").substring(0,8);
//    };
    public void EmailCheck(String email,String CheckNum) {
    	String subject = "쥐구멍 회원가입 이메일 인증번호";
    	String text = "<html>"
    				+ "<body>"
    				+ "<h3>인증번호 : " + CheckNum + "<h3>"
    				+ "</body"
    				+ "</html>";
    				sendEmail(email,subject,text);
    				;
    }
}

/*
 * 
 * 
 * 
 * 로그인 컨트롤러
 * 
 * 
 * 
 * */
package com.jwi.work.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String loginP() {

        return "login";
    }
}
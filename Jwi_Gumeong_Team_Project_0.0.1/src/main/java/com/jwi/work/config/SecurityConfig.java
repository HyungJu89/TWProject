package com.jwi.work.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

//아무 class에나 @ 밑에 두개를 붙여주면 spring security의 설정을 할 수 있음.
@Configuration
@EnableWebSecurity
public class SecurityConfig {
//어떤 페이지를 로그인검사할지 설정가능 filterchain: 모든 유저의 요청과 서버의 응답 사이에 자동으로 실행해주고 싶은 코드 담는 곳
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	  //csrf 보안기능을 끄는 코드 csrf: 우리가 컨트롤러 api를 만들면 다른사이트에서도 form action태그로 url을 치면 내가 만든사이트 api를 쓸수있기 때문에 그걸 방지하는 코드.	
	http.csrf((csrf) -> csrf.disable());
	  //아무 경로에서 로그인 검사 해제 ("/**"): 아무 문자가 붙은 경로라는 뜻 .permitAll(): 모든 경로 로그인검사 하지않고 허용
    http.authorizeHttpRequests((authorize) ->
         authorize.requestMatchers("/**").permitAll()
    );
    return http.build();
  }
}

package com.jwi.work.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                // 특정 URL 또는 URL 에 대한 조건을 걸때 사용합니다.
                .authorizeHttpRequests(auth -> auth
                		// requestMatchers : 어떤 경로에 대해 조건을 걸것인지
                		// permitAll : 모든 사용자가 접속 가능
                     	.requestMatchers("/WEB-INF/view/**").permitAll()
                        .requestMatchers("/", "/login", "/loginProc").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        // hasRole : 권한이 있는 사용자가 접속 가능
                        .requestMatchers("/manager/**").hasRole("MANAGER")
                        // hasAnyRole : URL 경로에 대한 권한을 2개 이상 줄수있음
                        .requestMatchers("/user/**").hasAnyRole("MANAGER", "USER")
                        // anyRequest : 루트가 설정되어 있지 않은 나머지 URL 에 대한 설정
                        // authenticated : 아무 권한이나 가지고있어야 접속가능
                        .anyRequest().authenticated()
                );


        http
        		// 폼 로그인을 설정합니다. (옵션: 로그인 페이지 등을 지정할 수 있습니다) 
                .formLogin(auth -> auth // 사용자 정의 로그인 페이지 경로
                		.loginPage("/login") // 권한없는 페이지로 이동시 리다이렉션
                		// 로그인 성공하면 이동할 URL (없애버리고 컨트롤러로 해도됨)
                        .loginProcessingUrl("/loginProc")
                        // 모든 사용자가 로그인 페이지에 접근할 수 있도록 허용
                        .permitAll()
                );

        http
        // CSRF 공격 방지 설정을 활성화합니다. 로그인 로직 완성하면 활성화 시켜야함
        //        .csrf(Customizer.withDefaults())
        // CSRF 공격 방지 설정을 비활성화합니다.
                .csrf(auth -> auth.disable());


        return http.build();
    }
}
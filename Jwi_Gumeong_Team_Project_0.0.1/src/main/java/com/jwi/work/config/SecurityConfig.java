package com.jwi.work.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

//아무 class에나 @ 밑에 두개를 붙여주면 spring security의 설정을 할 수 있음.
@Configuration
@EnableWebSecurity
public class SecurityConfig {

//	csrf 보안기능 설정하는 코드
//	@Bean
//	public CsrfTokenRepository csrfTokenRepository() {
//	  HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
//	  repository.setHeaderName("X-XSRF-TOKEN");
//	  return repository;
//	}
	
//		어떤 페이지를 로그인검사할지 설정가능 filterchain: 모든 유저의 요청과 서버의 응답 사이에 자동으로 실행해주고 싶은 코드 담는 곳
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
//		csrf 보안기능을 끄는 코드 csrf: 우리가 컨트롤러 api를 만들면 다른사이트에서도 form action태그로 url을 치면 내가
//		만든사이트 api를 쓸수있기 때문에 그걸 방지하는 코드
		
		http.csrf((csrf) -> csrf.disable());
		
//		아무 경로에서 로그인 검사 해제 ("/**"): 아무 문자가 붙은 경로라는 뜻 .permitAll(): 모든 경로 로그인검사 하지않고 허용
		http.authorizeHttpRequests((authorize) ->
			authorize.requestMatchers("/**").permitAll()
		);
		
//		나중에 추가한 코드라서 지금당장 설명할 필요 없음.
		http.addFilterBefore(new JwtFilter(), ExceptionTranslationFilter.class);
		
		http.sessionManagement((session) -> session
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	    );
		
//		http.csrf(csrf -> csrf.csrfTokenRepository(csrfTokenRepository())
//			       .ignoringRequestMatchers("/login")
//		);
		
//		http.authorizeHttpRequests((authorize) -> authorize
//			.requestMatchers("/admin/**").authenticated() // 어드민 경로에만 인증 적용
//			.anyRequest()
//			.permitAll() // 나머지 경로는 모두 허용
//		);
		
//		JWT 쓸꺼면 필요없슴 form로그인 방식일때만 사용
		
//		http.formLogin((formLogin) -> formLogin
//			.loginPage("/admin/login")
//			.defaultSuccessUrl("/admin")
//			.loginProcessingUrl("/admin")
//			.failureUrl("/")
//		);
//		로그아웃시 이동 딱히 필요없긴함		
//		http.logout(logout -> logout.logoutUrl("/admin"));
		return http.build();
	}
	
//	Bean 사용하면 내부객체를 외부에서 자동으로 사용가능함
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
//	Cors 설정 (React 통신용) 당장 중요하지않아서 안알아봄
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("http://localhost:3000"); // 리액트 서버 주소
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}
}
package com.jwi.work.admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jwi.work.admin.repository.AdminRepository;


@Service
public class AdminLoginService implements UserDetailsService {
	@Autowired
	private AdminRepository adminRepository;
	
	//시큐리티 폼방식 로그인 방법
	//UsernameNotFoundException 스프링시큐리티 내장객체(라이브러리) 오버라이드
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		// JPA 스토리지 불러옴
		var result = adminRepository.findById(id);
		// 불러왔을때 없으면 UsernameNotFoundException 내장객체(라이브러리) 이용하여 에러 출력
		if(result.isEmpty()) {
			System.out.println("체크123");
            throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다. : " + id);
		}
		// Optional 형식은.get()하면 가져올수있음
		var user = result.get();
		// 권한처리관련 배열인데 딱히 기능은 없고 이름만 그런거임
		List<GrantedAuthority> authority = new ArrayList<>();
		authority.add(new SimpleGrantedAuthority("어드민"));
		return new User(user.getId(), user.getPw(), authority);
	}
	
	
}

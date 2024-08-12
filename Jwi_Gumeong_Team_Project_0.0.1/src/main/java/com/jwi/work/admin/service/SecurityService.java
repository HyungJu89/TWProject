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
public class SecurityService implements UserDetailsService{
	
	@Autowired
	private AdminRepository adminRepository;
	
	// 시큐리티 폼방식 로그인 방법중 어센틱케이션 내부코드 인젝트해서 임의대로 설정하는 코드
	// UsernameNotFoundException 스프링시큐리티 내장객체(라이브러리) 오버라이드
	@Override
	public UserDetails loadUserByUsername(String adminName) throws UsernameNotFoundException {
		// JPA 스토리지 불러옴
		var result = adminRepository.findByAdminName(adminName);
		// 불러왔을때 없으면 UsernameNotFoundException 내장객체(라이브러리) 이용하여 에러 출력
		if(result.isEmpty()) {
            throw new UsernameNotFoundException("해당 사용자를 찾을 수 없습니다. : " + adminName);
		}
		// Optional 형식은.get()하면 가져올수있음
		var user = result.get();
		// 권한처리관련 배열인데 딱히 기능은 없고 이름만 그런거임
		List<GrantedAuthority> authority = new ArrayList<>();
		authority.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		return new User(user.getAdminName(), user.getAdminPassWord(), authority);
	}
	
}
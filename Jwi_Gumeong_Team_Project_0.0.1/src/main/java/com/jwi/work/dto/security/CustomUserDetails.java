package com.jwi.work.dto.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class CustomUserDetails implements UserDetails {

    private UserSecurityDto userSecurityDto;

    public CustomUserDetails(UserSecurityDto userSecurityDto) {

        this.userSecurityDto = userSecurityDto;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {
			
			@Override
			public String getAuthority() {
			
				return userSecurityDto.getRole();
			}
		});
        
		return collection;

    }

    @Override // 비밀번호 리턴
    public String getPassword() {
        return userSecurityDto.getPassword();
    }

    @Override // 닉네임 리턴
    public String getUsername() {
        return userSecurityDto.getUsername();
    }


    @Override  // 계정 활성화 여부
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override // 계정 잠김 여부
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override // 자격 만료여부
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override // 활성화 됨
    public boolean isEnabled() {
        return true;
    }
}
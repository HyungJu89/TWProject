package com.jwi.work.admin.util;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	// yml로 대체 해볼예정
	static final SecretKey key = Keys.hmacShaKeyFor(
			Decoders.BASE64.decode(
					"chldldlarladkswh0828chldldlarladkswh0828chldldlarladkswh0828"
			));

	// JWT 만들어주는 함수
	public static String createToken(Authentication auth) {
		var user = (UserDetails) auth.getPrincipal();
		String jwt = Jwts.builder()
				// .claim()으로 token 발급함 민감한 정보는 발급하지 않는편이 좋음 다 볼수있어써
				// 리스트,객체는 출력안됨 문자열(String)만 가능
				.claim("adminName", user.getUsername())
				.claim("adminPassWord", user.getPassword())
				.claim("adminPassWord", user.getPassword())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 1800000)) // 유효기간 1800초
				.signWith(key)
				.compact();
		return jwt;
	}

	// JWT 까주는 함수
	public static Claims extractToken(String token) {
		Claims claims = Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
		return claims;
	}

}
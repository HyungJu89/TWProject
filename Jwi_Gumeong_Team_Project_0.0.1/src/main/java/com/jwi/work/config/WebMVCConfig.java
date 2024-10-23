package com.jwi.work.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.Data;

@Configuration
@Data
public class WebMVCConfig implements WebMvcConfigurer {

	@Value("${file.upload-dir}")
	private String uploadDir;
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    	String fileRoot = "file:" + uploadDir;
        registry.addResourceHandler("/images/**")
        .addResourceLocations(fileRoot);
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 허용
                .allowedOrigins("*") // 허용할 출처
                .allowedMethods("*") // 허용할 메서드
                .allowedHeaders("*"); // 허용할 헤더
    }
    
}
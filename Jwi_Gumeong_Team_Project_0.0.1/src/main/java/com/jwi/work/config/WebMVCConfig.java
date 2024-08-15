package com.jwi.work.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
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
    
}
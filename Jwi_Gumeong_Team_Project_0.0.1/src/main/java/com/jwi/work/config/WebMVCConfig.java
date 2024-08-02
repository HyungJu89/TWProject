package com.jwi.work.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.jwi.work.channel.util.FileManagerUtil;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer {

 
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        registry.addResourceHandler("/images/**")
        // 배포시 file 뒤 / 하나 빼기
        .addResourceLocations("file:///" + FileManagerUtil.FILE_ROOT + "/");
    }
    
}
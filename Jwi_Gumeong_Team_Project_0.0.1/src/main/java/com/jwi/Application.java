package com.jwi; // 이 코드는 com.jwi 패키지에 속합니다.

import org.springframework.boot.SpringApplication; // 스프링 부트의 실행을 위한 클래스를 불러옵니다.
import org.springframework.boot.autoconfigure.SpringBootApplication; // 스프링 부트의 애플리케이션 설정을 자동으로 처리합니다.
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@SpringBootApplication(scanBasePackages = "com.jwi.work") // 스프링 부트 애플리케이션임을 나타냅니다.
//@EnableJpaRepositories(basePackages = {"com.jwi.work.admin.repository","com.jwi.work.center.repository"})
public class Application { // 이 클래스는 애플리케이션의 진입점입니다.
    // main 메서드: 프로그램의 시작점입니다.
    public static void main(String[] args) {
        // SpringApplication 클래스의 run 메서드를 호출하여 스프링 부트 애플리케이션을 시작합니다.
        SpringApplication.run(Application.class, args);
    }

}

package com.en.training.minithread.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EnableAspectJAutoProxy
@EnableJpaAuditing
@EnableSpringDataWebSupport
public class AppConfig {
}

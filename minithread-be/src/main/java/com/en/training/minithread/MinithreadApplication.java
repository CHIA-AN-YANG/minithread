package com.en.training.minithread;

import com.en.training.minithread.security.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class MinithreadApplication {

	public static void main(String[] args) {
		SpringApplication.run(MinithreadApplication.class, args);
	}

}

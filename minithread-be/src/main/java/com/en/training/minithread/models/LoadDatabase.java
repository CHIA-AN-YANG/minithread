package com.en.training.minithread.models;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;


public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(AccountRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(new Account("Bilbo Baggins", "testUser1")));
            log.info("Preloading " + repository.save(new Account("Frodo Baggins", "testUser2")));
        };
    }
}

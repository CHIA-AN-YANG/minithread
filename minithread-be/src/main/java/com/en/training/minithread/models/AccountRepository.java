package com.en.training.minithread.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    // JPA will provide the class
    Optional<Account> findByUsername(String username);

    void deleteByUsername(String username);
}

package com.en.training.minithread.services;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.AccountRepository;
import com.en.training.minithread.models.LoadDatabase;
import com.nimbusds.oauth2.sdk.util.StringUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {
    private static final Logger log = LoggerFactory.getLogger(AccountService.class);
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository,
            PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account getAccount(String username) {
        // use try catch
        try {
            log.info("Account found: " + accountRepository.findByUsername(username));
            return accountRepository.findByUsername(username).get();
        } catch (Exception e) {
            log.error("Account not found with username: " + username, e);
            throw new RuntimeException("Account not found with username: " + username);
        }
    }

    public Account createAccountIfNotExist(String username, String rawPassword) {
        try {
            Optional<Account> account = accountRepository.findByUsername(username);
            if (account.isPresent()) {
                throw new RuntimeException("Account already exists" + username);
            } else {
                Account newAccount = new Account();
                newAccount.setUsername(username);
                Account createdAccount = createAccount(newAccount, rawPassword);
                log.info("Account created: " + createdAccount);
                return createdAccount;
            }
        } catch (Exception e) {
            log.error("error creating account" + username, e);
            throw new RuntimeException("error creating account" + username);
        }
    }

    public Account findOrCreateOauthAccount(String name, String email) {
        String username = name + email.hashCode();
        if (accountRepository.findByUsername(username).isPresent()) {
            return accountRepository.findByUsername(username).get();
        }
        Account newAccount = new Account(username, email);
        return accountRepository.save(newAccount);
    }

    public Account createAccount(Account account, String rawPassword) {

        if (account == null || StringUtils.isBlank(rawPassword)) {
            throw new IllegalArgumentException("Account and password must not be null");
        }

        account.setPassword(passwordEncoder.encode(rawPassword));

        return accountRepository.save(account);
    }

    public void updatePassword(String username, String oldPassword, String newPassword) {

        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!passwordEncoder.matches(oldPassword, account.getPassword())) {
            throw new RuntimeException("Invalid current password");
        }

        validatePasswordStrength(newPassword);

        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
    }

    public Account updateAccount(String username, Account updatedAccount) {

        Optional<Account> account = accountRepository.findByUsername(username);
        if (account.isPresent()) {
            Account existingAccount = account.get();
            existingAccount.setUsername(updatedAccount.getUsername());
            existingAccount.setEmail(updatedAccount.getEmail());
            existingAccount.setBio(updatedAccount.getBio());
            return accountRepository.save(existingAccount);
        }
        log.error("Account not found with username: " + username);
        throw new RuntimeException("Account not found with username: " + username);
    }

    // add delete account
    public String deleteAccount(String username) {
        if (accountRepository.findByUsername(username).isPresent()) {
            accountRepository.deleteByUsername(username);
        }
        throw new RuntimeException("Account not found with username: " + username);
    }

    private void validatePasswordStrength(String password) {
        if (password == null || password.length() < 8) {
            throw new RuntimeException("Password must be at least 8 characters long");
        }

        if (!password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
            throw new RuntimeException("Password must include uppercase, lowercase, number, and special character");
        }
    }
}

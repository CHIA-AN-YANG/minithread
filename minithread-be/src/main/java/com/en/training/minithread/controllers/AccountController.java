package com.en.training.minithread.controllers;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.en.training.minithread.services.AccountService.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Get an account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable String username, Principal principal) {
        try {
            Account account = accountService.getAccount(username);
            return ResponseEntity.ok(account);
        } catch (AccountNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new account
    @PostMapping
    public Account createAccount(@PathVariable String email, @PathVariable String name) {
        return accountService.createAccountIfNotExist(email, name);
    }

    // Update an account
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable String username, @RequestBody Account account) {
        try {
            Account updatedAccount = accountService.updateAccount(username, account);
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an account
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String username) {
        accountService.deleteAccount(username);
        return ResponseEntity.noContent().build();
    }
}

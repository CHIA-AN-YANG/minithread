package com.en.training.minithread.controllers;

import com.en.training.minithread.dto.AccountResponse;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Get all accounts
    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    // Get an account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable String username, Principal principal) {
        // TODO: check if id matches user id
        return accountService.getAccount(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new account
    @PostMapping
    public Account createAccount(@PathVariable String email, @PathVariable String name) {
        return accountService.createAccountIfNotExist(email,name);
    }

    // Update an account
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable UUID id, @RequestBody Account account) {
        try {

            return ResponseEntity.ok(accountService.updateAccount(id, account));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an account
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.noContent().build();
    }

    private Optional<ResponseEntity<Object>> map(Object o) {
        if (o == null) {
            return Optional.of(ResponseEntity.badRequest().body("Invalid Account data"));
        }

        return Optional.of(
                ResponseEntity.ok(new AccountResponse(this.id, this.username, this.email, this.profilePicture, this.bio))
        );
    }
}

package com.en.training.minithread.controllers;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.en.training.minithread.services.AccountService.AccountNotFoundException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AccountService accountService;

    @Operation(summary = "Get an account by username", description = "Fetch an account by their unique username")
    @ApiResponse(responseCode = "200", description = "Account found")
    @ApiResponse(responseCode = "404", description = "Account not found")
    @GetMapping("/{username}")
    public ResponseEntity<Account> getAccountById(@PathVariable String username, Principal principal) {
        try {
            Account account = accountService.getAccount(username);
            return ResponseEntity.ok(account);
        } catch (AccountNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Create an account", description = "Create a new account")
    @ApiResponse(responseCode = "201", description = "Account created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input provided")
    @PostMapping
    public Account createAccount(
            @PathVariable String username,
            @PathVariable String password,
            @PathVariable String email
    ) {
        return accountService.createAccountIfNotExist(username, password, email);
    }

    @Operation(summary = "Update an account", description = "Update an existing account")
    @ApiResponse(responseCode = "200", description = "Account updated successfully")
    @ApiResponse(responseCode = "404", description = "Account not found")
    @PutMapping("/{username}")
    public ResponseEntity<Account> updateAccount(@PathVariable String username, @RequestBody Account account) {
        try {
            Account updatedAccount = accountService.updateAccount(username, account);
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete an account", description = "Delete an existing account")
    @ApiResponse(responseCode = "204", description = "Account deleted successfully")
    @ApiResponse(responseCode = "404", description = "Account not found")
    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteAccount(@PathVariable String username) {
        accountService.deleteAccount(username);
        return ResponseEntity.noContent().build();
    }
}

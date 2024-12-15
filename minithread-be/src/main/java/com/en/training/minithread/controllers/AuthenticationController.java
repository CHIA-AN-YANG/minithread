package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.wsdtos.AccountWsDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AccountService accountService;

    @Operation(summary = "Register a new account", description = "Register a new account to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Account created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input provided")
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Account account) {
        Account newAccount = accountService.createAccount(account, account.getPassword());
        return ResponseEntity.ok(newAccount);
    }

    @Operation(summary = "Login", description = "Login to an existing account")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login success"),
            @ApiResponse(responseCode = "403", description = "Account access is denied")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AccountWsDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            Account account = accountService.getAccount(loginRequest.getUsername());
            return ResponseEntity.ok(account);
        } else {
            // If authentication fails, return 401 with error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}

package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.controllers.dtos.UpdateUserRequest;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.Objects;

@RestController
@Tag(name = "User", description = "Operations for user")
@RequestMapping("api/me")
public class UserController {

    private AccountService accountService;

    UserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Get user details", description = "Fetch the details of the currently logged in user")
    @ApiResponse(responseCode = "200", description = "User details found")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping("/detail")
    public ResponseEntity<AccountDTO> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        final String username = jwt.getClaim("sub");
        if (StringUtils.isBlank(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        final Account currentUser = accountService.getAccount(username);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        final AccountDTO account = new AccountDTO(currentUser.getUsername(), currentUser.getEmail());
        account.setName(StringUtils.isNotBlank(currentUser.getName()) ? currentUser.getName() : "");
        account.setBio(StringUtils.isNotBlank(currentUser.getBio()) ? currentUser.getBio() : "");

        return ResponseEntity.ok(account);
    }

    @PutMapping(value = "/update", consumes = "multipart/form-data")
    public ResponseEntity<AccountDTO> updateCurrentUser(
            Authentication authentication,
            @RequestBody UpdateUserRequest request) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        final String username = jwt.getClaim("sub");
        if (StringUtils.isBlank(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        final Account account = this.accountService.updateAccount(username, request);
        final AccountDTO accountDTO = this.accountService.mapAccountToAccountDTO(account);
        return ResponseEntity.ok(accountDTO);

    }
}

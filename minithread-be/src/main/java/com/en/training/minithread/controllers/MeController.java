package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Me", description = "Operations for current login user")
@RequestMapping("api/me")
public class MeController {

    private AccountService accountService;

    MeController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Get my details", description = "Fetch the details of the current login user")
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
        final AccountDTO account = new AccountDTO(currentUser.getName(), currentUser.getUsername());
        account.setName(StringUtils.isNotBlank(currentUser.getName()) ? currentUser.getName() : "");
        account.setBio(StringUtils.isNotBlank(currentUser.getBio()) ? currentUser.getBio() : "");

        return ResponseEntity.ok(account);
    }

    @PutMapping(value = "/update")
    public ResponseEntity<AccountDTO> updateCurrentUser(
            Authentication authentication,
            @RequestParam String bio,
            @RequestParam String name,
            @RequestParam String email) {
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
        final Account account = this.accountService.updateAccount(username, email, name, bio);
        final AccountDTO accountDTO = this.accountService.mapAccountToAccountDTO(account);
        return ResponseEntity.ok(accountDTO);

    }
}

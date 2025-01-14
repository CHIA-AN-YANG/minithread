package com.en.training.minithread.controllers;

import com.en.training.minithread.annotation.RequiresAuthenticatedUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.nimbusds.oauth2.sdk.util.StringUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "User", description = "Operations for user")
@RequestMapping("/api/user")
public class UserController {

    private final AccountService accountService;

    UserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @Operation(summary = "Get user info", description = "Fetch info of user")
    @ApiResponse(responseCode = "200", description = "User details found")
    @GetMapping("/{username}")
    public ResponseEntity<AccountDTO> getCurrentUser(@PathVariable String username) {
        final Account currentUser = accountService.getAccount(username);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        final AccountDTO account = new AccountDTO(currentUser.getUsername());
        account.setName(StringUtils.isNotBlank(currentUser.getName()) ? currentUser.getName() : "");
        account.setBio(StringUtils.isNotBlank(currentUser.getBio()) ? currentUser.getBio() : "");
        account.setProfilePicture(
                StringUtils.isNotBlank(currentUser.getProfilePicture()) ? currentUser.getProfilePicture() : "");
        return ResponseEntity.ok(account);
    }

    @RequiresAuthenticatedUser
    @PostMapping("{followId}/follow")
    public ResponseEntity<AccountDTO> addFollowing(
            Account authenticatedUser,
            @PathVariable String followId) {
        final String currentUsername = authenticatedUser.getUsername();
        final Account updatedAccount = accountService.addFollowing(currentUsername, followId);
        final AccountDTO accountDto = accountService.mapAccountToAccountDTO(updatedAccount);
        return ResponseEntity.ok(accountDto);
    }

    @RequiresAuthenticatedUser
    @DeleteMapping("{followId}/unfollow")
    public ResponseEntity<AccountDTO> deleteFollowing(
            Account authenticatedUser,
            @PathVariable String followId) {
        final String currentUsername = authenticatedUser.getUsername();
        final Account updatedAccount = accountService.deleteFollowing(currentUsername, followId);
        final AccountDTO accountDto = accountService.mapAccountToAccountDTO(updatedAccount);
        return ResponseEntity.ok(accountDto);
    }
}

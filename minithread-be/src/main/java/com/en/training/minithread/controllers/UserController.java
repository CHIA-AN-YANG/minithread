package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@Tag(name = "User", description = "Operations for user")
@RequestMapping("api/user")
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
        final AccountDTO accountDto = new AccountDTO(currentUser.getName(), currentUser.getUsername());
        accountDto.setName(StringUtils.isNotBlank(currentUser.getName()) ? currentUser.getName() : "");
        accountDto.setBio(StringUtils.isNotBlank(currentUser.getBio()) ? currentUser.getBio() : "");

        return ResponseEntity.ok(accountDto);
    }

}

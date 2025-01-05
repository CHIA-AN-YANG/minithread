package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.controllers.dtos.UpdateUserRequest;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import com.en.training.minithread.services.TokenService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "Authentication", description = "Operations for authentication")
@RequestMapping("api/auth")
public class AuthController {

    private static final Logger LOG = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountService accountService;

    @Operation(summary = "Register a new account", description = "Register a new account to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Account created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input provided")
    })
    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> register(@RequestParam String username, @RequestParam String password, @RequestParam String email) {
        try {
            Account newAccount = accountService.createAccountIfNotExist(username, password, email);
            return ResponseEntity.ok(newAccount);
        } catch (Exception e) {
            LOG.warn("Registration failed", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Operation(summary = "Token", description = "Get token for authentication", security = @SecurityRequirement(name = "basicAuth"))
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token issued"),
            @ApiResponse(responseCode = "401", description = "Account access is unauthorized")
    })
    @PostMapping("/token")
    public ResponseEntity<Map<String, Object>> token(Authentication authentication) {
        Map<String, Object> response = new HashMap<>();
        try {
            String token = tokenService.generateToken(authentication);
            LOG.debug("Token granted: {}", token);
            response.put("valid", true);
            response.put("token", token);
            response.put("message", "Token issued successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LOG.warn("Token generation failed", e);
            response.put("valid", false);
            response.put("token", "");
            response.put("message", "Token generation failed");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(response);
        }
    }

//    public ResponseEntity<?> handleAuth(
//            Authentication authentication) {
//        if (authentication == null || !authentication.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
//        }
//        final String username = jwt.getClaim("sub");
//        if (StringUtils.isBlank(username)) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//        }
//        return username;
//    }
}

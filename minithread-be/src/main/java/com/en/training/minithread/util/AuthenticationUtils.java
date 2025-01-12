package com.en.training.minithread.util;


import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;

import java.util.Optional;

@Component
public class AuthenticationUtils {
    @Autowired
    private AccountService accountService;

    public Optional<Account> getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return Optional.empty();
        }

        final String username = jwt.getClaim("sub");
        if (StringUtils.isBlank(username)) {
            return Optional.empty();
        }

        return Optional.ofNullable(accountService.getAccount(username));
    }
}

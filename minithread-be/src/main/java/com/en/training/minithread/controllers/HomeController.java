package com.en.training.minithread.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "Welcome to the app! <a href='/oauth2/authorization/google'>Login with Google</a>";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome to the app dashboard, you have successfully logged in";
    }

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return principal.getAttributes();
    }
}

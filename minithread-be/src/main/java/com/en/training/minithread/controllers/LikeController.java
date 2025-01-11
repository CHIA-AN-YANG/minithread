package com.en.training.minithread.controllers;

import com.en.training.minithread.annotation.RequiresAuthenticatedUser;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.services.LikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/threads")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{postId}/like")
    @RequiresAuthenticatedUser
    public ResponseEntity<?> likePost(@PathVariable Long postId, Account authenticatedUser) {
        final String username = authenticatedUser.getUsername();
        likeService.likePost(postId, username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/like")
    @RequiresAuthenticatedUser
    public ResponseEntity<?> unlikePost(@PathVariable Long postId, Account authenticatedUser) {
        final String username = authenticatedUser.getUsername();
        likeService.unlikePost(postId, username);
        return ResponseEntity.ok().build();
    }
}

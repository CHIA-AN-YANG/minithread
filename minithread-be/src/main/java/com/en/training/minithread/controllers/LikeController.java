package com.en.training.minithread.controllers;


import com.en.training.minithread.controllers.dtos.ThreadDTO;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.services.LikeService;
import com.en.training.minithread.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/threads")
public class LikeController {

    private final LikeService likeService;
    private final PostService postService;

    public LikeController(LikeService likeService, PostService postService) {
        this.likeService = likeService;
        this.postService = postService;
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        final String username = jwt.getClaim("sub");
        likeService.likePost(postId, username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{postId}/like")
    public ResponseEntity<?> unlikePost(@PathVariable Long postId, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        final String username = jwt.getClaim("sub");
        likeService.unlikePost(postId, username);
        return ResponseEntity.ok().build();
    }
}

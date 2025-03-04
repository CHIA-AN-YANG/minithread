package com.en.training.minithread.controllers;

import com.en.training.minithread.annotation.RequiresAuthenticatedUser;
import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.controllers.dtos.PageResponse;
import com.en.training.minithread.controllers.dtos.ThreadDTO;
import com.en.training.minithread.controllers.dtos.UpdateUserDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.security.services.NotificationMessageService;
import com.en.training.minithread.services.AccountService;
import com.en.training.minithread.services.PostService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Me", description = "Operations for current login user")
@RequestMapping("/api/me")
public class MeController {

    private final AccountService accountService;
    private final PostService postService;

    @Autowired
    private NotificationMessageService notificationMessageService;

    MeController(AccountService accountService, PostService postService) {
        this.accountService = accountService;
        this.postService = postService;
    }

    @Operation(summary = "Get my details", description = "Fetch the details of the current login user")
    @ApiResponse(responseCode = "200", description = "User details found")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "User not found")
    @RequiresAuthenticatedUser
    @GetMapping("/detail")
    public ResponseEntity<AccountDTO> getCurrentUser(Account currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        final AccountDTO account = accountService.mapAccountToAccountDTO(currentUser);
        return ResponseEntity.ok(account);
    }

    @Operation(summary = "Get my comments", description = "Fetch comments from me with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Threads found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
            @ApiResponse(responseCode = "404", description = "Threads not found", content = @Content)
    })
    @RequiresAuthenticatedUser
    @GetMapping("/comments")
    public ResponseEntity<PageResponse<ThreadDTO>> getUserPosts(
            Account currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Sort sort = Sort.by("createdAt").descending();
        try {
            final String username = currentUser.getUsername();
            Page<Post> pageResultPost = postService.getPostCommentsList(PageRequest.of(page, size, sort), username);
            return ResponseEntity.ok(postService.mapPostPageToPageDTO(pageResultPost, username));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @RequiresAuthenticatedUser
    @GetMapping(value = "/threads")
    public ResponseEntity<PageResponse<ThreadDTO>> getMyThreads(
            Account currentUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Sort sort = Sort.by("createdAt").descending();
        try {
            final String username = currentUser.getUsername();
            Page<Post> pageResultPost = postService.getPostList(PageRequest.of(page, size, sort), username);
            return ResponseEntity.ok(postService.mapPostPageToPageDTO(pageResultPost, username));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @RequiresAuthenticatedUser
    @PostMapping(value = "/update" , consumes = "multipart/form-data")
    public ResponseEntity<AccountDTO> updateCurrentUser(
            Account currentUser,
            @ModelAttribute UpdateUserDTO dto) {
        final String username = currentUser.getUsername();
        final Account account = this.accountService.updateAccount(username, dto);
        final AccountDTO accountDTO = this.accountService.mapAccountToAccountDTO(account);
        return ResponseEntity.ok(accountDTO);
    }

    @GetMapping("/notification")
    public List<Object> getNotifications() {
        List<Object> messages = notificationMessageService.getMessages();
        System.out.println("Messages in Redis: " + messages);
        return messages;
    }
}

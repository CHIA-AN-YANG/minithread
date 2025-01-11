package com.en.training.minithread.controllers;

import com.en.training.minithread.annotation.RequiresAuthenticatedUser;
import com.en.training.minithread.controllers.dtos.AccountDTO;
import com.en.training.minithread.controllers.dtos.PageResponse;
import com.en.training.minithread.controllers.dtos.ThreadDTO;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.services.AccountService;
import com.en.training.minithread.services.PostService;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Me", description = "Operations for current login user")
@RequestMapping("api/me")
public class MeController {

    private final AccountService accountService;
    private final PostService postService;

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
    public ResponseEntity<AccountDTO> getCurrentUser(Account authenticatedUser) {
        final AccountDTO account = new AccountDTO(authenticatedUser.getName(), authenticatedUser.getUsername());
        account.setName(StringUtils.isNotBlank(authenticatedUser.getName()) ? authenticatedUser.getName() : "");
        account.setBio(StringUtils.isNotBlank(authenticatedUser.getBio()) ? authenticatedUser.getBio() : "");

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
            Account authenticatedUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Sort sort = Sort.by("createdAt").descending();
        try {
            final String username = authenticatedUser.getUsername();
            Page<Post> pageResultPost = postService.getPostCommentsList(PageRequest.of(page, size, sort), username);
            List<ThreadDTO> threadDtoList = pageResultPost.getContent().stream()
                    .map(p -> postService.mapPostToThreadDTO(p, username))
                    .toList();
            PageResponse<ThreadDTO> pageResultThreadDTO = new PageResponse<>(
                    threadDtoList,
                    pageResultPost.getNumber(),
                    pageResultPost.getTotalPages(),
                    pageResultPost.getTotalElements());

            return ResponseEntity.ok(pageResultThreadDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @RequiresAuthenticatedUser
    @GetMapping(value = "/threads")
    public ResponseEntity<PageResponse<ThreadDTO>> getMyThreads(
            Account authenticatedUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Sort sort = Sort.by("createdAt").descending();
        final String username = authenticatedUser.getUsername();
        try {
            Page<Post> pageResultPost = postService.getPostList(PageRequest.of(page, size, sort), username);
            List<ThreadDTO> threadDtoList = pageResultPost.getContent().stream()
                    .map(p -> postService.mapPostToThreadDTO(p, username))
                    .toList();
            PageResponse<ThreadDTO> pageResultThreadDTO = new PageResponse<>(
                    threadDtoList,
                    pageResultPost.getNumber(),
                    pageResultPost.getTotalPages(),
                    pageResultPost.getTotalElements());
            return ResponseEntity.ok(pageResultThreadDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @RequiresAuthenticatedUser
    @PostMapping(value = "/update")
    public ResponseEntity<AccountDTO> updateCurrentUser(
            Account authenticatedUser, @RequestParam String bio, @RequestParam String name,
            @RequestParam String email, @RequestParam String profilePicture) {
        final Account account = this.accountService
                .updateAccount(authenticatedUser.getUsername(), email, name, bio, profilePicture);
        final AccountDTO accountDTO = this.accountService.mapAccountToAccountDTO(account);
        return ResponseEntity.ok(accountDTO);

    }

    @RequiresAuthenticatedUser
    @PostMapping("{followId}/follow")
    public ResponseEntity<AccountDTO> addFollowing(
            Account authenticatedUser,
            @PathVariable String followId) {
        final String username = authenticatedUser.getUsername();
        final Account updatedAccount = accountService.addFollowing(username, followId);
        final AccountDTO accountDto = accountService.mapAccountToAccountDTO(updatedAccount);
        return ResponseEntity.ok(accountDto);
    }

    @RequiresAuthenticatedUser
    @PostMapping("{followId}/unfollow")
    public ResponseEntity<AccountDTO> deleteFollowing(
            Account authenticatedUser,
            @PathVariable String followId) {
        final String username = authenticatedUser.getUsername();
        final Account updatedAccount = accountService.deleteFollowing(username, followId);
        final AccountDTO accountDto = accountService.mapAccountToAccountDTO(updatedAccount);
        return ResponseEntity.ok(accountDto);
    }
}

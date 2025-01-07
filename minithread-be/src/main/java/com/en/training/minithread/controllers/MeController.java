package com.en.training.minithread.controllers;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Me", description = "Operations for current login user")
@RequestMapping("api/me")
public class MeController {

    private AccountService accountService;
    private PostService postService;

    MeController(AccountService accountService,PostService postService) {
        this.accountService = accountService;
        this.postService = postService;
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

    @Operation(summary = "Get my comments", description = "Fetch comments from me with pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Threads found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
            @ApiResponse(responseCode = "404", description = "Threads not found", content = @Content)
    })
    @GetMapping("/comments")
    public ResponseEntity<PageResponse<ThreadDTO>> getUserPosts(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Sort sort = Sort.by("createdAt").descending();;
        try {
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
            Page<Post> pageResultPost = postService.getPostCommentsList(PageRequest.of(page, size, sort), username);
            List<ThreadDTO> threadDTOList = pageResultPost.getContent().stream().map(postService::mapPostToThreadDTO)
                    .toList();
            PageResponse<ThreadDTO> pageResultThreadDTO = new PageResponse<>(
                    threadDTOList,
                    pageResultPost.getNumber(),
                    pageResultPost.getTotalPages(),
                    pageResultPost.getTotalElements());

            return ResponseEntity.ok(pageResultThreadDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
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

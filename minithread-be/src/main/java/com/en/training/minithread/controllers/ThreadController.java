package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.CreatePostRequest;
import com.en.training.minithread.controllers.dtos.PageResponse;
import com.en.training.minithread.controllers.dtos.ThreadDTO;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.services.PostService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Tag(name = "Threads", description = "Operations for threads")
@RequestMapping("/api/threads")
public class ThreadController {

  private PostService postService;

  ThreadController(PostService postService) {
    this.postService = postService;
  }

  @Operation(summary = "Get a thread by ID", description = "Fetch a thread by their unique ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "thread found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "thread not found", content = @Content)
  })
  @GetMapping("/{id}")
  public ResponseEntity<ThreadDTO> getPostById(@PathVariable Long id, Authentication authentication) {
    Optional<Post> post = postService.getPost(id);
    final String myUsername = checkOptionalAuthentication(authentication);
    if (post.isPresent()) {
      ThreadDTO threadDto = postService.mapPostToThreadDTO(post.get(), myUsername);
      return ResponseEntity.ok(threadDto);
    }
    return ResponseEntity.notFound().build();
  }

  @Operation(summary = "Get latest threads", description = "Fetch the latest threads with pagination")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Threads found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "Threads not found", content = @Content)
  })
  @GetMapping("/latest")
  public ResponseEntity<PageResponse<ThreadDTO>> getLatestPosts(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size,
      Authentication authentication ) {
    Sort sort = Sort.by("createdAt").descending();
    final String myUsername = checkOptionalAuthentication(authentication);
    Page<Post> pageResultPost = postService.getPostList(PageRequest.of(page, size, sort));
    List<ThreadDTO> threadDtoList = pageResultPost.getContent().stream()
            .map(p -> postService.mapPostToThreadDTO(p, myUsername))
            .toList();
    PageResponse<ThreadDTO> pageResultThreadDTO = new PageResponse<>(
            threadDtoList,
            pageResultPost.getNumber(),
            pageResultPost.getTotalPages(),
            pageResultPost.getTotalElements());

    return ResponseEntity.ok(pageResultThreadDTO);
  }

  @Operation(summary = "Get threads by author", description = "Fetch threads from a specific author with pagination")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Threads found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "Threads not found", content = @Content)
  })
  @GetMapping("/by-author/{username}")
  public ResponseEntity<PageResponse<ThreadDTO>> getUserPosts(
      @PathVariable String username,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size,
      Authentication authentication ) {
    Sort sort = Sort.by("createdAt").descending();
    final String myUsername = checkOptionalAuthentication(authentication);

    try {
      Page<Post> pageResultPost = postService.getPostList(PageRequest.of(page, size, sort), username);
      List<ThreadDTO> threadDtoList = pageResultPost.getContent().stream()
              .map(p -> postService.mapPostToThreadDTO(p, myUsername))
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

  @Operation(summary = "Create a new thread", description = "Add a new thread to the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Thread created successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input provided")
  })
  @PostMapping()
  public ResponseEntity<ThreadDTO> createPost(@RequestBody CreatePostRequest request, Authentication authentication) {
    final String postContent = request.getContent();
    final String parentPostId = request.getParent();
    if (authentication == null || !authentication.isAuthenticated()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    final String username = jwt.getClaim("sub");
    final Post post;
    if (StringUtils.isNotBlank(parentPostId)) {
      post = postService.createComment(postContent, username, Long.valueOf(parentPostId));
    } else {
      post = postService.createPost(postContent, username);
    }
    ThreadDTO threadDTO = postService.mapPostToThreadDTO(post, username);
    return ResponseEntity.status(HttpStatus.CREATED).body(threadDTO);
  }

  @Operation(summary = "Update a thread", description = "Update an existing thread in the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post updated successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input provided"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @PutMapping("/{id}")
  public ResponseEntity<ThreadDTO> updatePost(
          Authentication authentication,
          @PathVariable Long id,
          @RequestBody CreatePostRequest request
  ) {
    if (authentication == null || !authentication.isAuthenticated()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    final String username = jwt.getClaim("sub");
    final String postContent = request.getContent();
    Post updatedPost = postService.updatePost(id, postContent);
    ThreadDTO threadDTO = postService.mapPostToThreadDTO(updatedPost, username);
    return new ResponseEntity<>(threadDTO, HttpStatus.OK);
  }

  @Operation(summary = "Delete a thread", description = "Delete an existing thread in the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Post deleted successfully"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePost(Authentication authentication, @PathVariable Long id) {
    if (authentication == null || !authentication.isAuthenticated()) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    if (!(authentication.getPrincipal() instanceof Jwt jwt)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    final String username = jwt.getClaim("sub");
    try {
      postService.deletePost(id);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.notFound().build();
    }
  }


  private String checkOptionalAuthentication(Authentication authentication) {
    if (Objects.nonNull(authentication) && authentication.isAuthenticated()
            && (authentication.getPrincipal() instanceof Jwt jwt)) {
      return jwt.getClaim("sub");
    }
    return StringUtils.EMPTY;
  }
}

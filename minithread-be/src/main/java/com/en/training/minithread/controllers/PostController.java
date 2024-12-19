package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.CreatePostRequest;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.services.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

  private PostService postService;

  PostController(PostService postService) {
    this.postService = postService;
  }

  @Operation(summary = "Get a post by ID", description = "Fetch a post by their unique ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "post found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "post not found", content = @Content)
  })
  @GetMapping("/{id}")
  public Post getPostById(@PathVariable Long id) {
    Optional<Post> post = postService.getPost(id);
    return post.orElse(null);
  }

  // GET /posts?page=0&size=5&sortBy=title&sortDir=desc
  @Operation(summary = "Get latest posts", description = "Fetch the latest posts with pagination")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Posts found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "Posts not found", content = @Content)
  })
  @GetMapping("/latest")
  public Page<Post> getLatestPosts(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size) {
    Sort sort = Sort.by("createdAt").descending();
    return postService.getPostList(PageRequest.of(page, size, sort));
  }

  // curl
  // "http://localhost:8080/api/posts/by-author?username=johndoe&page=0&size=10&sort=createdAt,desc"
  @Operation(summary = "Get posts by author", description = "Fetch posts from a specific author with pagination")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Posts found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Post.class))),
      @ApiResponse(responseCode = "404", description = "Posts not found", content = @Content)
  })
  @GetMapping("/by-author/{username}")
  public Page<Post> getUserPosts(
      @PathVariable String username,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "5") int size) {
    Sort sort = Sort.by("createdAt").descending();
    return postService.getPostList(PageRequest.of(page, size, sort), username);
  }

  @Operation(summary = "Create a new post", description = "Add a new post to the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Post created successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input provided")
  })
  @PostMapping()
  public Post createPost(@RequestBody CreatePostRequest request) {
    final String postContent = request.getContent();
    final String authorId = request.getAuthor();

    Post createdPost = postService.createPost(postContent, authorId);
    return createdPost;
  }

  @Operation(summary = "Update a post", description = "Update an existing post in the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Post updated successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input provided"),
      @ApiResponse(responseCode = "404", description = "Post not found")
  })
  @PutMapping("/{id}")
  public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody CreatePostRequest request) {
    final String postContent = request.getContent();
    Post updatedPost = postService.updatePost(id, postContent);
    return new ResponseEntity<>(updatedPost, HttpStatus.OK);
  }
}
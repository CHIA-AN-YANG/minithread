package com.en.training.minithread.controllers;

import com.en.training.minithread.controllers.dtos.CreatePostRequest;
import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Operation(summary = "Create a new post", description = "Add a new post to the system")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Post created successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid input provided")
  })
  @PostMapping("/create")
  public Post createPost(@RequestBody CreatePostRequest request) {
    final String postContent = request.getContent();
    final String authorId = request.getAuthor();

    Post createdPost = postService.createPost(postContent, authorId);
    return createdPost;
  }
}

package com.en.training.minithread.services;

import com.en.training.minithread.models.Post;
import com.en.training.minithread.models.PostRepository;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService {
    private static final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Optional<Post> getPost(Long id) {
        try {
            log.info("Post found: " + postRepository.findById(id));
            return this.postRepository.findById(id);
        } catch (Exception e) {
            log.error("Post not found with id: " + id, e);
            throw new PostNotFoundException(id);
        }
    }

    public Post createPost(String content, String author) {
        try {
            Post newPost = new Post();
            newPost.setContent(content);
            newPost.setAuthor(author);
            Post createdPost = createRawPost(newPost);
            log.info("Post created: " + createdPost);
            return createdPost;
        } catch (Exception e) {
            log.error("Error creating post with content: " + content, e);
            throw new RuntimeException("Error creating post with content: " + content);
        }
    }

    public Post updatePost(Long id, Post updatedPost) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post existingPost = post.get();
            existingPost.setContent(updatedPost.getContent());
            existingPost.setAuthor(updatedPost.getAuthor());
            existingPost.setCreatedAt(updatedPost.getCreatedAt());
            existingPost.setUpdatedAt(updatedPost.getUpdatedAt());
            existingPost.setKeywords(updatedPost.getKeywords());
            return postRepository.save(existingPost);
        }
        log.error("Post not found with id: " + id);
        throw new PostNotFoundException(id);
    }

    // set parent post for a post
    public Post setParentPost(Long id, Long parentId) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post existingPost = post.get();
            existingPost.setParentpostId(parentId);
            return postRepository.save(existingPost);
        }
        log.error("Post not found with id: " + id);
        throw new PostNotFoundException(id);
    }

    public String deletePost(Long id) {
        if (postRepository.findById(id).isPresent()) {
            postRepository.deleteById(id);
            return "Post deleted successfully";
        }
        throw new PostNotFoundException(id);
    }

    public static class PostNotFoundException extends RuntimeException {
        public PostNotFoundException(Long id) {
            super(String.format("Post not found with id: %s", id));
        }
    }

    private Post createRawPost(Post post) {
        if (post == null || StringUtils.isBlank(post.getContent())) {
            throw new IllegalArgumentException("content must not be null");
        }

        return this.postRepository.save(post);
    }

    private void setParentPostById(Long childPostId, Long parentPostId) {
        Post childPost = postRepository.findById(childPostId)
                .orElseThrow(() -> new RuntimeException(String.format("Child post %s not found",childPostId)));
        Post parentPost = postRepository.findById(parentPostId)
                .orElseThrow(() -> new RuntimeException(String.format("Parent post %s not found",parentPostId)));

        childPost.setParentPost(parentPost);
        postRepository.save(childPost); // Save changes to the child post
    }
}

package com.en.training.minithread.services;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.AccountRepository;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.models.PostRepository;
import com.nimbusds.oauth2.sdk.util.StringUtils;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PostService {
    private static final Logger log = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;
    private final AccountRepository accountRepository;

    public PostService(PostRepository postRepository, AccountRepository accountRepository) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
    }

    public Optional<Post> getPost(Long id) {
        try {
            log.info("Post found: " + postRepository.findById(id));
            return this.postRepository.findById(id);
        } catch (Exception e) {
            log.error("Cannot get post. Post not found with id: " + id, e);
            throw new PostNotFoundException(id);
        }
    }

    public Page<Post> getPostList(PageRequest pageRequest) {
        try {
            return postRepository.findAll(pageRequest);
        } catch (Exception e) {
            log.error("Cannot get post pagination.", e);
            List<Post> emptyList = Collections.emptyList();
            return new PageImpl<>(emptyList, PageRequest.of(0, 5), 0);
        }
    }

    public Page<Post> getPostList(PageRequest pageRequest, String username) {
        try {
            return postRepository.findByAuthor_Username(username, pageRequest);
        } catch (Exception e) {
            log.error("Cannot get post pagination.", e);
            List<Post> emptyList = Collections.emptyList();
            return new PageImpl<>(emptyList, PageRequest.of(0, 5), 0);
        }
    }

    public Post createPost(String content, String username) {
        try {
            Post createdPost = setRawPost(content, username);
            postRepository.save(createdPost);
            log.info(String.format("Post created: %s", createdPost));
            return createdPost;
        } catch (Exception e) {
            log.error("Error creating post with content: " + content, e);
            throw new RuntimeException("Error creating post with content: " + content);
        }
    }

    public Post createComment(String content, String username, Long parentPostId) {
        try {
            Post createdPost = setRawPost(content, username);
            try {
                Post parentPost = this.postRepository.getReferenceById(parentPostId);
                createdPost.setParentPost(parentPost);

            } catch (Exception e) {
                throw new RuntimeException("Parent post not found: " + parentPostId);
            }
            return postRepository.save(createdPost);
        } catch (Exception e) {
            log.error("Error creating post with content: " + content, e);
            throw new RuntimeException("Error creating post with content: " + content);
        }
    }

    public Post updatePost(Long id, final String content) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post existingPost = post.get();
            existingPost.setContent(content);
            return postRepository.save(existingPost);
        }
        log.error("Cannot update post. Post not found with id: " + id);
        throw new PostNotFoundException(id);
    }

    // set parent post for a post
    public Post setParentPost(Long id, Long parentId) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post existingPost = post.get();
            setParentPostById(id, parentId);
            return postRepository.save(existingPost);
        }
        log.error("Cannot set parent post. Post not found with id: " + id);
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

    private Post setRawPost(final String content, final String username) {
        Post newPost = new Post();
        newPost.setContent(content);
        if (StringUtils.isBlank(newPost.getContent())) {
            throw new IllegalArgumentException("content must not be null");
        }
        return setPostAuthor(newPost, username);
    }

    private Post setPostAuthor(Post post, final String username) {
        Account author = accountRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Author not found with ID: " + username));
        post.setAuthor(author);
        return post;
    }

    private void setParentPostById(Long childPostId, Long parentPostId) {
        Post childPost = postRepository.findById(childPostId)
                .orElseThrow(() -> new RuntimeException(String.format("Child post %s not found", childPostId)));
        Post parentPost = postRepository.findById(parentPostId)
                .orElseThrow(() -> new RuntimeException(String.format("Parent post %s not found", parentPostId)));

        childPost.setParentPost(parentPost);
        postRepository.save(childPost); // Save changes to the child post
    }
}

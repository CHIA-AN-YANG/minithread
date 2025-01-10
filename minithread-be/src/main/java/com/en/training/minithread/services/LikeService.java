package com.en.training.minithread.services;

import com.en.training.minithread.models.Account;
import com.en.training.minithread.models.AccountRepository;
import com.en.training.minithread.models.Post;
import com.en.training.minithread.models.PostRepository;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class LikeService {

    private final PostRepository postRepository;
    private final AccountRepository accountRepository;

    public LikeService(PostRepository postRepository, AccountRepository accountRepository) {
        this.postRepository = postRepository;
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void likePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!post.getLikedBy().contains(account)) {  // Updated to use likedBy
            post.getLikedBy().add(account);          // Updated to use likedBy
            account.getLikedPosts().add(post);
            postRepository.save(post);
        }
    }
    @Transactional
    public void unlikePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        post.getLikedBy().remove(account);
        account.getLikedPosts().remove(post);
        postRepository.save(post);
    }

    public boolean checkPostLikedByAccount(Long postId, String username) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        final UUID accountId = account.getId();
        return postRepository.isPostLikedByAccount(postId, accountId);
    }

    private boolean isPostLikedByAccount(Long postId, UUID accountId) {
        return postRepository.isPostLikedByAccount(postId, accountId);
    }
}

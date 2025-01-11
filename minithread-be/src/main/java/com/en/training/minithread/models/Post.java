package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = "uuid")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private final UUID uuid = UUID.randomUUID();

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @CreatedDate
    @Column(name = "createdAt", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime updatedAt;

    @Column()
    private String keywords;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author", referencedColumnName = "username", nullable = false)
    private Account author;

    @ManyToOne
    @JoinColumn(name = "parentPostId", nullable = true)
    private Post parentPost;

    @OneToMany(mappedBy = "parentPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> comments = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "likes", joinColumns = @JoinColumn(name = "postId"), inverseJoinColumns = @JoinColumn(name = "accountId"))
    private Set<Account> likedBy = new HashSet<>();

    public Post() {
    }

    public Post(String content, Account author,
            String keywords, Set<Account> likedBy,
            Post parentPost, Set<Post> comments) {
        this.content = content;
        this.author = author;
        this.keywords = keywords;
        this.likedBy = likedBy;
        this.parentPost = parentPost;
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}

package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.*;

@Entity
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @CreatedDate
    @Column(name = "createdAt", columnDefinition = "TIMESTAMP")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt", columnDefinition = "TIMESTAMP")
    private Date updatedAt;

    @Column()
    private String keywords;

    @ManyToOne
    @JoinColumn(name = "account", table="account", nullable = false)
    private Account author;

    @ManyToOne
    @JoinColumn(name = "parent_post_id", nullable = true)
    private Post parentPost;

    @OneToMany(mappedBy = "parentPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> comments = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "likes", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "account_id"))
    private Set<Account> accounts = new HashSet<>();

    public Post() {
    }

    public Post(String content, Account author,
            String keywords, Set<Account> accounts,
            Post parentPost, Set<Post> comments) {
        this.content = content;
        this.author = author;
        this.keywords = keywords;
        this.accounts = accounts;
        this.parentPost = parentPost;
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id)
                && Objects.equals(author, post.author) && Objects.equals(createdAt, post.createdAt);

    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author);
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                ", keywords='" + keywords + '\'' +
                '}';
    }
}

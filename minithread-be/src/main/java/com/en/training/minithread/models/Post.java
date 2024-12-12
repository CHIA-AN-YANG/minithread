package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import co.elastic.clients.elasticsearch._types.query_dsl.Like;


@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    @Getter
    @Column(name = "content", columnDefinition = "text")
    private String content;
    @Setter
    @Getter
    private String author;
    @Setter
    @Getter
    private String createdAt;
    @Setter
    @Getter
    private String updatedAt;
    @Getter
    @Column(name = "keywords")
    private String keywords;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "parent_post_id", nullable = true)
    private Post parentPost;

    @Setter
    @Getter
    @OneToMany(mappedBy = "parentPost", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> comments = new HashSet<>();

    @Setter
    @Getter
    @ManyToMany
    @JoinTable(name = "likes", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "account_id"))
    private Set<Account> accounts = new HashSet<>();

    public Post() {
    }

    public Post(String content, String author,
            String createdAt, String updatedAt,
            String keywords, Set<Account> accounts,
            Post parentPost, Set<Post> comments) {
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
        return Objects.hash(id, content, author);
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

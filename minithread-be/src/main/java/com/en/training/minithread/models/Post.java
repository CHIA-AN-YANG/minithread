package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    @Getter
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

    public Post() {
    }

    public Post(String content, String author, String createdAt, String updatedAt, String keywords) {
        this.content = content;
        this.author = author;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.keywords = keywords;
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

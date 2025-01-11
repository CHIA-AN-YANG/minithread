package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Data
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(length = 50)
    private String name;

    @CreatedDate
    @Column(name = "createdAt", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt", columnDefinition = "TIMESTAMP WITH TIME ZONE")
    private LocalDateTime updatedAt;

    @Column(name = "profilePicture")
    private String profilePicture; // Nullable field for profile picture

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Post> posts;

    @ManyToMany(mappedBy = "likedBy")
    private Set<Post> likedPosts = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "follow",
            joinColumns = @JoinColumn(name = "followerId"),
            inverseJoinColumns = @JoinColumn(name = "followingId")
    )
    private Set<Account> following;

    @ManyToMany(mappedBy = "following")
    private Set<Account> followers;

    public Account() {
    }

    public Account(String username, String email) {
        this.username = username;
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email +
                '}';
    }
}

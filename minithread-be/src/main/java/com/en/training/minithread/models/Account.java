package com.en.training.minithread.models;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @CreatedDate
    @Column(name = "createdAt", columnDefinition = "TIMESTAMP")
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updatedAt", columnDefinition = "TIMESTAMP")
    private Date updatedAt;

    @Column(name = "profile_picture")
    private UUID profilePicture; // Nullable field for profile picture

    @Column(columnDefinition = "TEXT")
    private String bio;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;

    @ManyToMany(mappedBy = "accounts")
    private Set<Post> posts = new HashSet<>();

    // Default constructor
    public Account() {
    }

    // Parameterized constructor
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

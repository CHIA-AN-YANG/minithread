package com.en.training.minithread.models;

import com.en.training.minithread.dto.AccountResponse;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "accounts") // Table name in the database
@Getter
@Setter
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

    @Column(name = "profile_picture")
    private UUID profilePicture; // Nullable field for profile picture

    @Column(columnDefinition = "TEXT")
    private String bio;

    // Default constructor
    public Account() {}

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

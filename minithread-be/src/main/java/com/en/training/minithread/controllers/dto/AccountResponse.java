package com.en.training.minithread.controllers.dto;

import java.util.UUID;

class AccountResponse {
    private UUID id;
    private String username;
    private String email;
    private UUID profilePicture;
    private String bio;

    public AccountResponse(UUID id, String username, String email, UUID profilePicture, String bio) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }

    // Getters and setters (optional if using @Getter and @Setter)
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UUID getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(UUID profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}

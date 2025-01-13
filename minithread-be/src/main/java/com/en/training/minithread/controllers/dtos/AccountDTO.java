package com.en.training.minithread.controllers.dtos;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AccountDTO {
    private String username;
    private String email;
    private String profilePicture;
    private String bio ="";
    private String name ="";
    private String createdAt;
    private String updatedAt;
    private String[] followers;
    private String[] followed;

    public AccountDTO(String username) {
        this.username = username;
        this.email = "";
        this.bio ="";
        this.name ="";
        this.profilePicture="";
    }
}

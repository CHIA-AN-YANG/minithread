package com.en.training.minithread.controllers.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;


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
    private ArrayList<String> followers;
    private ArrayList<String> followed;

    public AccountDTO(String username) {
        this.username = username;
        this.email = "";
        this.bio ="";
        this.name ="";
        this.profilePicture="";
        this.followed = new ArrayList<>();
        this.followers = new ArrayList<>();
    }
}

package com.en.training.minithread.controllers.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AccountDTO {
    private String username;
    private String email;
    private String password;
    private String profilePicture;
    private String bio ="";
    private String name ="";
    private String createdAt;
    private String updatedAt;
    private Boolean verified;

    public AccountDTO(String name, String username) {
        this.name = name == null ? "" : name;
        this.username = username;
    }
}

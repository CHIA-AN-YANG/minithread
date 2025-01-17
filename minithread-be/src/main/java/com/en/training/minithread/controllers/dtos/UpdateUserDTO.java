package com.en.training.minithread.controllers.dtos;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {
    private String bio;
    private String email;
    private String name;
    private String profilePicture;
}

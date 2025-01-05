package com.en.training.minithread.controllers.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostRequest {
    private String content;
    private String parent;
}

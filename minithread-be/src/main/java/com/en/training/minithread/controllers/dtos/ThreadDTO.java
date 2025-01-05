package com.en.training.minithread.controllers.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class ThreadDTO {
  private String id;
  private String author;
  private String content;
  private String parentPost;
  private String createdAt;
  private String updatedAt;
  private ArrayList<ThreadDTO> comments;

  public ThreadDTO() {
    this.id = "";
    this.parentPost = "";
    this.author = "";
    this.content = "";
    this.createdAt = "";
    this.updatedAt = "";
  }

  public ThreadDTO(String id, String parentPost, String author, String content, String createdAt, String updatedAt) {
    this.id = id;
    this.parentPost = parentPost;
    this.author = author;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

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
  // private ArrayList<String> likedBy;    may cause performance issue when there's a large amount of likes.
  // solution -> (1) separate it to another api and service; (2) query first friends and check if they like the post
  private int commentCount;
  private int likedByCount;
  private Boolean likedByMe;

  public ThreadDTO() {
    this.id = "";
    this.parentPost = "";
    this.author = "";
    this.content = "";
    this.createdAt = "";
    this.updatedAt = "";
    this.likedByCount = 0;
    this.likedByMe = false;
  }
}

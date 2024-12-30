package com.en.training.minithread.controllers.dtos;

import java.util.ArrayList;

public class PostDTO {
  private String id;
  private String author;
  private String content;
  private String parentPost;
  private String createdAt;
  private String updatedAt;
  private ArrayList<PostDTO> comments;

  public PostDTO() {
    this.id = "";
    this.parentPost = "";
    this.author = "";
    this.content = "";
    this.createdAt = "";
    this.updatedAt = "";
  }

  public PostDTO(String id, String parentPost, String author, String content, String createdAt, String updatedAt) {
    this.id = id;
    this.parentPost = parentPost;
    this.author = author;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(String updatedAt) {
    this.updatedAt = updatedAt;
  }

  public ArrayList<PostDTO> getComments() {
    return comments;
  }

  public void setComments(ArrayList<PostDTO> comments) {
    this.comments = comments;
  }

  public String getParentPost() {
    return parentPost;
  }

  public void setParentPost(String parentPost) {
    this.parentPost = parentPost;
  }
}

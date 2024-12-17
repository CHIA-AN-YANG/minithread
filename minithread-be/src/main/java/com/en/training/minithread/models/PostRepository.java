package com.en.training.minithread.models;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
  Page<Post> findByAuthor_Username(String username, Pageable pageable);

  Page<Post> findByText(String text, Pageable pageable);

}

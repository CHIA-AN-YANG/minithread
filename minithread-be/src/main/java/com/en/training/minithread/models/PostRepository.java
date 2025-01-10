package com.en.training.minithread.models;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, Long> {
  Page<Post> findByAuthor_Username(String username, Pageable pageable);

  @Query("SELECT p FROM Post p WHERE p.parentPost IS NULL")
  Page<Post> findAllNotComments(Pageable pageable);

  @Query("SELECT p FROM Post p WHERE p.author.username = :username AND p.parentPost IS NULL")
  Page<Post> findTopLevelPostsByAuthor(
          @Param("username") String username,
          Pageable pageable
  );

  @Query("SELECT p FROM Post p WHERE p.author.username = :username AND p.parentPost IS NOT NULL")
  Page<Post> findCommentsByAuthor(
          @Param("username") String username,
          Pageable pageable
  );

  @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Post p " +
          "JOIN p.likedBy l WHERE p.id = :postId AND l.id = :accountId")
  boolean isPostLikedByAccount(@Param("postId") Long postId, @Param("accountId") UUID accountId);

}

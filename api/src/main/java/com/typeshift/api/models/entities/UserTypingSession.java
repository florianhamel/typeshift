package com.typeshift.api.models.entities;

import com.typeshift.api.models.enums.TypingType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table
public class UserTypingSession {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false)
  private Integer wpm;

  @Column(nullable = false)
  private Integer accuracy;

  @Column(nullable = false)
  private TypingType typingType;

  @Column
  private String label;

  @CreationTimestamp
  @Column(nullable = false)
  private Instant created;
}

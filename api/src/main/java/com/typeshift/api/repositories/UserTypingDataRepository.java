package com.typeshift.api.repositories;

import com.typeshift.api.models.entities.User;
import com.typeshift.api.models.entities.UserTypingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTypingDataRepository extends JpaRepository<UserTypingSession, Integer> {
  List<UserTypingSession> findAllByUser(User user);
}

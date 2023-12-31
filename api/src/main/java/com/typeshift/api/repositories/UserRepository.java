package com.typeshift.api.repositories;

import com.typeshift.api.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findUserByUsernameOrEmail(String username, String email);

  Boolean existsByEmail(String email);

  Boolean existsByUsername(String username);
}

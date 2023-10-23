package com.typeshift.api.repositories;

import com.typeshift.api.models.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findUserByUsernameOrEmail(String username, String email);

  Boolean existsByUsernameOrEmail(String username, String email);
}

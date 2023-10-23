package com.typeshift.api.controllers;

import com.typeshift.api.models.User.User;
import com.typeshift.api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {

  private final UserRepository userRepository;

  @PostMapping("/who-am-i")
  public ResponseEntity<String> whoAmI() {
    return ResponseEntity.ok(SecurityContextHolder.getContext().getAuthentication().getName());
  }

  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    var users = userRepository.findAll();
    return ResponseEntity.ok(users);
  }

  @GetMapping("/test")
  public ResponseEntity<String> test() {
    return ResponseEntity.ok("Coucou");
  }
}

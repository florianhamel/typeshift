package com.typeshift.api.controllers;

import com.typeshift.api.exceptions.UserAlreadyExistsException;
import com.typeshift.api.models.Authentication.AuthenticationDTO;
import com.typeshift.api.models.Authentication.LoginForm;
import com.typeshift.api.models.Authentication.SignInForm;
import com.typeshift.api.services.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
public class AuthenticationController {
  private final AuthenticationService service;

  @PostMapping("/login")
  public ResponseEntity<AuthenticationDTO> login(@RequestBody LoginForm loginForm, HttpServletResponse response) {
    var authenticationDTO = service.authenticate(loginForm, response);
    log.info("User [{}] was successfully authenticated!", authenticationDTO.getUsername());
    return ResponseEntity.ok(authenticationDTO);
  }

  @PostMapping("/sign-in")
  public ResponseEntity<?> signIn(SignInForm signInForm) throws UserAlreadyExistsException {
    var registeredUser = Optional.ofNullable(service.register(signInForm))
      .orElseThrow(UserAlreadyExistsException::new);
    log.info("User [{}] was successfully registered!", registeredUser.getUsername());
    return ResponseEntity.ok().build();
  }
}

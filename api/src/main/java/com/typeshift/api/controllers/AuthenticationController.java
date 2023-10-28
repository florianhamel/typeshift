package com.typeshift.api.controllers;

import com.typeshift.api.exceptions.UserAlreadyExistsException;
import com.typeshift.api.models.Authentication.LogInDTO;
import com.typeshift.api.models.Authentication.LogInForm;
import com.typeshift.api.models.Authentication.SignUpDTO;
import com.typeshift.api.models.Authentication.SignUpForm;
import com.typeshift.api.services.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
public class AuthenticationController {
  private final AuthenticationService service;

  @PostMapping("/log-in")
  public ResponseEntity<LogInDTO> login(@RequestBody LogInForm logInForm, HttpServletResponse response) {
    var logInDTO = service.authenticate(logInForm, response);
    log.info("User [{}] was successfully authenticated!", logInDTO.getUsername());
    return ResponseEntity.ok(logInDTO);
  }

  @PostMapping("/sign-up")
  public ResponseEntity<SignUpDTO> signUp(@Valid @RequestBody SignUpForm signUpForm) throws UserAlreadyExistsException {
    var signUpDTO = service.register(signUpForm);
    log.info("User [{}] was successfully registered!", signUpDTO.getUsername());
    return ResponseEntity.ok(signUpDTO);
  }
}

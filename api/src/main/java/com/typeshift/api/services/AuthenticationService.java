package com.typeshift.api.services;

import com.typeshift.api.exceptions.UserAlreadyExistsException;
import com.typeshift.api.mappers.AuthenticationMapper;
import com.typeshift.api.models.DTOs.authentication.in.LogInForm;
import com.typeshift.api.models.DTOs.authentication.in.SignUpForm;
import com.typeshift.api.models.DTOs.authentication.out.LogInDTO;
import com.typeshift.api.models.DTOs.authentication.out.SignUpDTO;
import com.typeshift.api.models.entities.User;
import com.typeshift.api.models.enums.Gender;
import com.typeshift.api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final AuthenticationMapper authenticationMapper;

  public LogInDTO authenticate(LogInForm loginForm, HttpServletResponse response) {
    var authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginForm.getUsername(),
        loginForm.getPassword()
      )
    );
    var jwtToken = jwtService.generateJwtToken(authentication);
    var jwtCookie = jwtService.generateJwtCookie(jwtToken);
    response.addHeader("Set-Cookie", jwtCookie.toString());

    var authenticationDTO = authenticationMapper.map((User) authentication.getPrincipal());
    authenticationDTO.setExpiration(jwtService.extractExpiration(jwtToken).toInstant().toEpochMilli());
    return authenticationDTO;
  }

  public SignUpDTO register(SignUpForm signUpForm) {
    if (userRepository.existsByEmail(signUpForm.getEmail())) {
      throw new UserAlreadyExistsException("EMAIL_ALREADY_EXISTS");
    } else if (userRepository.existsByUsername(signUpForm.getUsername())) {
      throw new UserAlreadyExistsException("USERNAME_ALREADY_EXISTS");
    }
    var user = User.builder()
      .email(signUpForm.getEmail())
      .username(signUpForm.getUsername())
      .password(passwordEncoder.encode(signUpForm.getPassword()))
      .firstname("John")
      .lastname("Doe")
      .gender(Gender.MALE)
      .created(Instant.now())
      .updated(Instant.now())
      .build();
    var savedUser = userRepository.save(user);
    return SignUpDTO.builder()
      .email(savedUser.getEmail())
      .username(savedUser.getUsername())
      .build();
  }
}

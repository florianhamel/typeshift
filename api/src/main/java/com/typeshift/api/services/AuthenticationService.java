package com.typeshift.api.services;

import com.typeshift.api.mappers.AuthenticationMapper;
import com.typeshift.api.models.Authentication.AuthenticationDTO;
import com.typeshift.api.models.Authentication.LoginForm;
import com.typeshift.api.models.Authentication.SignInForm;
import com.typeshift.api.models.User.User;
import com.typeshift.api.repositories.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthenticationService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final AuthenticationMapper authenticationMapper;

  public AuthenticationDTO authenticate(LoginForm loginForm, HttpServletResponse response) {
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

  public User register(SignInForm signinForm) {
    if (userRepository.existsByUsernameOrEmail(signinForm.getUsername(), signinForm.getEmail())) {
      return null;
    }
    var user = User.builder()
      .email(signinForm.getEmail())
      .username(signinForm.getUsername())
      .password(passwordEncoder.encode(signinForm.getPassword()))
      .firstname(signinForm.getFirstname())
      .lastname(signinForm.getLastname())
      .created(LocalDateTime.now())
      .updated(LocalDateTime.now())
      .active(Boolean.TRUE)
      .build();
    return userRepository.save(user);
  }
}

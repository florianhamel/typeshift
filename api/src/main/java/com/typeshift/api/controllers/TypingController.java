package com.typeshift.api.controllers;

import com.typeshift.api.models.DTOs.typing.in.TypingSession;
import com.typeshift.api.models.DTOs.typing.out.TypingData;
import com.typeshift.api.services.TypingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@CrossOrigin("http://localhost:4200")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/typing")
public class TypingController {
  private final TypingService typingService;

  @GetMapping("/data")
  ResponseEntity<TypingData> getTypingData() {
    var typingData = typingService.getTypingData();
    return ResponseEntity.ok(typingData);
  }

  @PostMapping("/session")
  void processTypingSession(@RequestBody @Valid TypingSession session) {
    typingService.saveTypingSession(session);
    log.info("[{}] sent a session with {} wpm and {} accuracy",
      SecurityContextHolder.getContext().getAuthentication().getName(), session.getWpm(), session.getAccuracy());
  }

  @PostMapping("/sessions")
  void processTypingSessions(@RequestBody @Valid TypingSession[] sessions) {
    for (TypingSession session : sessions) {
      log.info(session.toString());
    }
    typingService.saveTypingSessions(Arrays.stream(sessions).toList());
    log.info("Multiple sessions saved for just authenticated user [{}]",
      SecurityContextHolder.getContext().getAuthentication().getName());
  }
}

package com.typeshift.api.services;

import com.typeshift.api.models.DTOs.typing.in.TypingSession;
import com.typeshift.api.models.DTOs.typing.out.TypingData;
import com.typeshift.api.models.entities.User;
import com.typeshift.api.models.entities.UserTypingSession;
import com.typeshift.api.models.enums.TypingType;
import com.typeshift.api.repositories.UserRepository;
import com.typeshift.api.repositories.UserTypingDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class TypingService {
  private final UserTypingDataRepository userTypingDataRepository;
  private final UserRepository userRepository;

  public void saveTypingSession(TypingSession session) {
    var username = SecurityContextHolder.getContext().getAuthentication().getName();
    var user = userRepository.findUserByUsernameOrEmail(username, username)
      .orElseThrow(() -> new UsernameNotFoundException("User [" + username + "] not found"));
    var userSession = buildUserTypingSession(user, session);
    userTypingDataRepository.save(userSession);
  }

  public void saveTypingSessions(List<TypingSession> sessions) {
    var username = SecurityContextHolder.getContext().getAuthentication().getName();
    var user = userRepository.findUserByUsernameOrEmail(username, username)
      .orElseThrow(() -> new UsernameNotFoundException("User [" + username + "] not found"));
    var userSessions = sessions.stream().map(session ->
      buildUserTypingSession(user, session)
    ).toList();
    userTypingDataRepository.saveAll(userSessions);
  }

  public TypingData getTypingData() {
    var username = SecurityContextHolder.getContext().getAuthentication().getName();
    var user = userRepository.findUserByUsernameOrEmail(username, username)
      .orElseThrow(() -> new UsernameNotFoundException("User [" + username + "] not found"));
    var userTypingSessions = userTypingDataRepository.findAllByUser(user);

    var sessionCount = userTypingSessions.size();
    var wpmTotal = userTypingSessions.stream()
      .reduce(0, (wpmSubtotal, session) -> wpmSubtotal + session.getWpm(), Integer::sum);
    var accuracyTotal = userTypingSessions.stream()
      .reduce(0, (accuracySubtotal, session) -> accuracySubtotal + session.getAccuracy(), Integer::sum);

    return TypingData.builder()
      .wpmMean(wpmTotal / sessionCount)
      .accuracyMean(accuracyTotal / sessionCount)
      .sessionCount(sessionCount)
      .build();
  }

  private UserTypingSession buildUserTypingSession(User user, TypingSession session) {
    return UserTypingSession.builder()
      .user(user)
      .wpm(session.getWpm())
      .accuracy(session.getAccuracy())
      .typingType(TypingType.valueOf(session.getType()))
      .label(session.getLabel())
      .build();
  }
}

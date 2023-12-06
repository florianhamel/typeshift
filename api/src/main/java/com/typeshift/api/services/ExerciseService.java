package com.typeshift.api.services;

import com.typeshift.api.models.DTOs.exercise.in.ExerciseDTO;
import com.typeshift.api.models.entities.Exercise;
import com.typeshift.api.repositories.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExerciseService {
  private final ExerciseRepository exerciseRepository;

  public void add(ExerciseDTO exerciseDTO) {
    log.info(exerciseDTO.toString());
    var newExercise = Exercise.builder()
      .characters(exerciseDTO.getCharacters())
      .level(exerciseDTO.getLevel())
      .build();
    exerciseRepository.save(newExercise);
  }

  public List<Exercise> getAll() {
    return exerciseRepository.findAll();
  }

  public Exercise getById(Integer exerciseId) {
    return this.exerciseRepository.findById(exerciseId)
      .orElse(null);
  }
}

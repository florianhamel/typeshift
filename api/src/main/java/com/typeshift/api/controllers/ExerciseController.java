package com.typeshift.api.controllers;

import com.typeshift.api.models.DTOs.exercise.in.ExerciseDTO;
import com.typeshift.api.models.entities.Exercise;
import com.typeshift.api.services.ExerciseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exercise")
@CrossOrigin(origins = "http://localhost:4200")
public class ExerciseController {
  private final ExerciseService exerciseService;

  @GetMapping
  ResponseEntity<List<Exercise>> getAllExercises() {
    return ResponseEntity.ok(exerciseService.getAll());
  }

  @GetMapping("/{exerciseId}")
  ResponseEntity<Exercise> getExercise(@PathVariable Integer exerciseId) {
    return ResponseEntity.ok(exerciseService.getById(exerciseId));
  }

  @PostMapping
  void postExercise(@Valid @RequestBody ExerciseDTO exerciseDto) {
    exerciseService.add(exerciseDto);
  }
}

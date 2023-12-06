package com.typeshift.api.models.DTOs.exercise.in;

import com.typeshift.api.models.enums.Level;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExerciseDTO {
  @NotNull
  private String characters;

  @NotNull
  private Level level;
}

package com.typeshift.api.models.converters;

import com.typeshift.api.models.enums.Level;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class LevelConverter implements AttributeConverter<Level, String> {
  @Override
  public String convertToDatabaseColumn(Level attribute) {
    return attribute.name();
  }

  @Override
  public Level convertToEntityAttribute(String dbData) {
    return Level.valueOf(dbData);
  }
}

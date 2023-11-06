package com.typeshift.api.models.converters;

import com.typeshift.api.models.enums.TypingType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TypingTypeConverter implements AttributeConverter<TypingType, String> {
  @Override
  public String convertToDatabaseColumn(TypingType attribute) {
    return attribute.name();
  }

  @Override
  public TypingType convertToEntityAttribute(String dbData) {
    return TypingType.valueOf(dbData);
  }
}

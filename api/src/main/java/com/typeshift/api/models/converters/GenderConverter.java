package com.typeshift.api.models.converters;

import com.typeshift.api.models.enums.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {
  @Override
  public String convertToDatabaseColumn(Gender attribute) {
    return attribute.name();
  }

  @Override
  public Gender convertToEntityAttribute(String dbData) {
    return Gender.valueOf(dbData);
  }
}

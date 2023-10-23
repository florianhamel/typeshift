package com.typeshift.api.mappers;

public interface Mapper<I, O> {
  O map(I entity);
}

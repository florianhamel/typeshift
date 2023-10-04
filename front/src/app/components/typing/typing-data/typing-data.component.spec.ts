import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingDataComponent } from './typing-data.component';

describe('TypingDataComponent', () => {
  let component: TypingDataComponent;
  let fixture: ComponentFixture<TypingDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingDataComponent]
    });
    fixture = TestBed.createComponent(TypingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

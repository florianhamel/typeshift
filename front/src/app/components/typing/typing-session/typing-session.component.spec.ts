import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingSessionComponent } from './typing-session.component';

describe('TypingInputComponent', () => {
  let component: TypingSessionComponent;
  let fixture: ComponentFixture<TypingSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingSessionComponent]
    });
    fixture = TestBed.createComponent(TypingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

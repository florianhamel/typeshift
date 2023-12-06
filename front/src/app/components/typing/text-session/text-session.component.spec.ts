import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSessionComponent } from './text-session.component';

describe('TypingInputComponent', () => {
  let component: TextSessionComponent;
  let fixture: ComponentFixture<TextSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextSessionComponent]
    });
    fixture = TestBed.createComponent(TextSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

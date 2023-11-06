import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiTypingComponent } from './ai-typing.component';

describe('AiTypingComponent', () => {
  let component: AiTypingComponent;
  let fixture: ComponentFixture<AiTypingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiTypingComponent]
    });
    fixture = TestBed.createComponent(AiTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

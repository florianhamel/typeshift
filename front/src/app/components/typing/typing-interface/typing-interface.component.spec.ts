import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypingInterfaceComponent } from './typing-interface.component';

describe('TypingTextComponent', () => {
  let component: TypingInterfaceComponent;
  let fixture: ComponentFixture<TypingInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypingInterfaceComponent]
    });
    fixture = TestBed.createComponent(TypingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

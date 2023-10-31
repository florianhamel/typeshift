import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiTypingComponent } from './wiki-typing.component';

describe('TypingTextComponent', () => {
  let component: WikiTypingComponent;
  let fixture: ComponentFixture<WikiTypingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WikiTypingComponent]
    });
    fixture = TestBed.createComponent(WikiTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

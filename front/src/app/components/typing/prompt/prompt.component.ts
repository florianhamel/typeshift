import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PromptDto {
  key: string;
  text: string;
}

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.less']
})
export class PromptComponent {
  @Input() disabled: boolean = false;
  @Output() charInput: EventEmitter<PromptDto> = new EventEmitter<PromptDto>();

  text: string = '';

  processInput(event: any): void {
    if (event.key === 'Dead') {
      return;
    }
    this.text = event.target.value;
    this.charInput.emit({
      key: event.key,
      text: this.text
    })
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PromptData {
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
  @Output() charInput: EventEmitter<PromptData> = new EventEmitter<PromptData>();

  text: string = '';
  ignoredKeys: string[] = ['Dead', 'Shift', 'CapsLock']

  processInput(event: any): void {
    if (this.ignoredKeys.includes(event.key)) {
      return;
    }
    this.text = event.target.value;
    this.charInput.emit({
      key: event.key,
      text: this.text
    })
  }
}

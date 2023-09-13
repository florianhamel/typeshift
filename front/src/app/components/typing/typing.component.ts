import { Component, Input, OnInit } from '@angular/core';
import { PromptDto } from './prompt/prompt.component';

export interface TypingStats {
  wpm: number;
  accuracy: number;
}

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.less']
})
export class TypingComponent implements OnInit {
  // @Input() text: string = 'Hey! Here is an é i.e. an e with a \'';
  @Input() text: string = 'Faster';

  timerStart!: Date;
  timerId!: number;
  currentTime: number = 0;
  displayTime: string = '0.0';
  inputIsValid: boolean | undefined = undefined;
  sessionValidated: boolean = false;
  typingStats!: TypingStats;

  ngOnInit() {
    this.timerStart = new Date();
    this.timerId = setInterval(() => {
      let now = new Date();
      this.currentTime = (now.getTime() - this.timerStart.getTime()) / 1000;
      this.displayTime = this.currentTime.toFixed(1);
    }, 10);
  }

  checkInput(data: PromptDto): void {
    if (data.text === this.text) {
      this.validateSession();
    } else {
      const subText: string = this.text.substring(0, data.text.length);
      this.inputIsValid = (subText === data.text);
      console.log('data', data);
      console.log(subText === data.text);
    }
  }

  validateSession(): void {
    this.sessionValidated = true;
    clearInterval(this.timerId);
    const words: number = this.text.length / 5;
    const minutes: number = this.currentTime / 60;
    const wpm: number = Math.round(words / minutes);
    console.log(words, minutes);
    this.typingStats = {wpm: wpm, accuracy: 100};
  }
}

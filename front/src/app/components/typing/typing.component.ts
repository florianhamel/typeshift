import { Component, OnInit } from '@angular/core';
import { PromptData } from './prompt/prompt.component';
import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';

export class TypingData {
  wpm: number = 0;
  keystrokes: number = 0;
  keystrokeErrors: number = 0;

  get accuracy(): number {
    return this.keystrokes > 0 ? 100 - Math.round(this.keystrokeErrors / this.keystrokes * 100) : NaN;
  }
}

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.less']
})
export class TypingComponent {
  text!: string;
  keyword: string = '';
  typingData: TypingData = new TypingData();

  inputIsValid: boolean | undefined = undefined;
  sessionValidated: boolean = false;
  timerStarted: boolean = false;

  timerId!: number;
  currentTime: number = 0;

  constructor(private readonly http: HttpClient) {
  }

  updateText(): void {
    this.currentTime = 0;
    this.timerStarted = false;
    clearInterval(this.timerId);
    setTimeout(() => {
      if (!this.timerStarted) {
        this.startTimer();
      }
    }, 5000);
    const url: string = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + this.keyword;
    const params = {
      format: 'json'
    };
    this.http.get(url, { params })
      .subscribe((response: any) => {
        this.text = response.extract;
      });
  }

  startTimer(): void {
    this.timerStarted = true;
    let start = new Date();
    this.timerId = setInterval(() => {
      let now = new Date();
      this.currentTime = (now.getTime() - start.getTime()) / 1000;
    }, 10);
  }

  checkInput(promptData: PromptData): void {
    if (!this.timerStarted) {
      this.startTimer();
    }
    if (promptData.key !== 'Backspace') { // TODO create enum for all possible keys 'Backspace', 'Dead', etc...
      this.typingData.keystrokes++;
    }
    if (promptData.text === this.text) {
      this.validateSession();
    } else {
      this.updateSession(promptData);
    }
  }

  updateSession(promptData: PromptData): void {
    const subText: string = this.text.substring(0, promptData.text.length);
    const isNewKeystrokeError: boolean = !!this.inputIsValid && (subText !== promptData.text);
    if (isNewKeystrokeError) {
      this.typingData.keystrokeErrors++;
    }
    this.inputIsValid = (subText === promptData.text);
  }

  validateSession(): void {
    this.sessionValidated = true;
    clearInterval(this.timerId);
    const words: number = this.text.length / 5;
    const minutes: number = this.currentTime / 60;
    this.typingData.wpm = (minutes > 0) ? Math.round(words / minutes) : NaN;
    console.log(this.typingData.keystrokeErrors);
  }
}

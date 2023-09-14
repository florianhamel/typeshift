import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypingService } from '../../../services/typing.service';

export const NOT_INPUT: number = 0;
export const INPUT: number = 1;

export class TypingData {
  wpm: number = 0;
  keystrokes: number = 0;
  keystrokeErrors: number = 0;

  get accuracy(): number {
    return 100 - (this.keystrokeErrors / this.keystrokes * 100);
  }

  wpmDisplay(): string {
    return this.keystrokes === 0 || this.keystrokes < 3 ? '-' : this.wpm.toFixed(0);
  }

  accuracyDisplay(): string {
    return this.keystrokes === 0 ? '-' : this.accuracy.toFixed(2) + '%';
  }
}

@Component({
  selector: 'app-typing-interface',
  templateUrl: './typing-interface.component.html',
  styleUrls: ['./typing-interface.component.less']
})
export class TypingInterfaceComponent {
  @ViewChild('textAreaRef') textAreaRef!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;

  keyword!: string;
  keyInput!: string;
  textRef!: string;
  textInput!: string;
  inputIsValid!: boolean | undefined;
  sessionValidated: boolean = false;

  timerId!: number;
  timerStarted: boolean = false;
  currentTime: number = 0;

  typingData: TypingData = new TypingData();

  constructor(private readonly http: HttpClient,
              private typingService: TypingService) {
  }

  updateText(): void {
    const url: string = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + this.keyword;
    const params = {
      format: 'json'
    };
    this.http.get(url, { params })
      .subscribe({
        next: (wiki: any) => {
          console.log(wiki.extract.substring(291).charCodeAt(0));
          this.setupNewText(wiki);
        },
        error: error => {
          this.setupNewText({ extract: 'Oupsi! That\'s a 404 (Not found)! Let\'s type this while you\'re here.' });
        }
      });
  }

  processInput(event: any): void {
    this.keyInput = event.key;
    this.textInput = event.target.value;
    if (this.typingService.checkIsRestart(this.keyInput)) {
      this.restartCurrentText();
    } else if (this.typingService.checkIsInput(this.keyInput)) {
      this.startTimer();
      this.typingData.keystrokes += this.verifyInput();
      const words: number = this.textInput?.length / 5;
      const minutes: number = this.currentTime / 60;
      this.typingData.wpm = (minutes > 0) ? Math.round(words / minutes) : NaN;
    }
  }

  private verifyInput(): number {
    if (!this.typingService.checkInputIsChar(this.keyInput)) {
      return NOT_INPUT;
    }
    if (this.textInput === this.textRef) {
      this.validateSession();
    } else {
      this.updateSession();
    }
    return INPUT;
  }

  private updateSession(): void {
    const subtextRef: string = this.textRef.substring(0, this.textInput.length);
    this.inputIsValid = this.typingService.checkInputValidity(subtextRef, this.textInput);
    if (!this.inputIsValid) {
      this.typingData.keystrokeErrors++;
    }
  }

  private validateSession(): void {
    this.sessionValidated = true;
    clearInterval(this.timerId);
    this.inputRef.nativeElement.focus();
  }

  private setupNewText(wiki: any): void {
    this.currentTime = 0;
    this.typingData = new TypingData();
    this.textRef = this.typingService.formatText(wiki.extract);
    this.textAreaRef.nativeElement.value = '';
    this.timerStarted = false;
    this.sessionValidated = false;
    clearInterval(this.timerId);
    setTimeout(() => {
      this.startTimer();
    }, 3000);
    setTimeout(() => { // Another way will be handled when the time comes with Loading component
      this.textAreaRef.nativeElement.focus();
    }, 50);
  }

  private restartCurrentText(): void {

  }

  private startTimer(): void {
    if (!this.timerStarted) {
      this.timerStarted = true;
      const start: Date = new Date();
      this.timerId = setInterval(() => {
        const now: Date = new Date();
        this.currentTime = (now.getTime() - start.getTime()) / 1000;
      }, 100);
    }
  }
}

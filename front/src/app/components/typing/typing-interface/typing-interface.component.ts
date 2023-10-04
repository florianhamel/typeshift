import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { IKeystroke, TypingSession } from '../../../models/TypingSession';
import { IKeyboardLayout } from '../../../services/typing/keyboard-layouts/IKeyboardLayout';
import { KEYBOARD_LAYOUT_TOKEN } from '../typing.module';
import { isDefined, isUndefined } from '../../../utils/checks';
import { WikiService } from '../../../services/typing/wiki.service';

@Component({
  selector: 'app-typing-interface',
  templateUrl: './typing-interface.component.html',
  styleUrls: ['./typing-interface.component.less']
})
export class TypingInterfaceComponent {
  @ViewChild('textInputRef') textInputRef!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;

  session: TypingSession = new TypingSession();

  constructor(private readonly wikiService: WikiService,
              @Inject(KEYBOARD_LAYOUT_TOKEN) private readonly keyboard: IKeyboardLayout) {
  }

  updateText(): void { // TODO extract data source from typing interface
    this.wikiService.getWikiExtract(this.session.keyword).subscribe({
      next: (wikiExtract: string): void => this.setupText(wikiExtract),
      error: (): void => this.setupText('Oupsi! That\'s a 404 (Not Found)! Let\'s type this while you\'re here.')
    });
  }

  keyPressed(event: KeyboardEvent): void {
    if (this.session.closed || this.keyboard.isRepeat(event)) {
      return;
    }
    this.startTimer();
    if (this.keyboard.isRestartKey(event)) {
      this.restartSession();
    } else {
      this.updateSession(event);
      if (this.session.closed) {
        this.terminateSession();
      }
    }
  }

  isInputCorrect(keystroke: IKeystroke): boolean {
    return (keystroke.source === keystroke.key);
  }

  isInputIncorrect(keystroke: IKeystroke): boolean {
    return (isDefined(keystroke.key) && keystroke.source !== keystroke.key);
  }

  isCurrent(index: number): boolean {
    return (index === this.session.index);
  }

  protected readonly isUndefined = isUndefined;

  private restartSession(): void {
    const tempKeystrokes: IKeystroke[] = this.session.keystrokes.map((keystroke: IKeystroke) => {
      keystroke.key = undefined;
      keystroke.keySequence = undefined;
      return keystroke;
    });
    this.clearSession();
    this.session.keystrokes = tempKeystrokes;
  }

  private clearSession(): void {
    clearInterval(this.session.intervalId);
    this.session = new TypingSession();
  }

  private startTimer(): void {
    if (isUndefined(this.session.startTime)) {
      this.session.startTime = new Date();
      this.session.intervalId = setInterval(() => {
        this.session.endTime = new Date();
      }, 20);
    }
  }

  private updateSession(event: KeyboardEvent): void {
    if (this.keyboard.isSequenceKey(event, this.session)) {
      this.keyboard.processSequenceKey(event, this.session);
    } else if (this.keyboard.isBackspaceKey(event)) {
      this.keyboard.processBackspaceKey(event, this.session);
    } else if (this.keyboard.isInputKey(event)) {
      this.keyboard.processInputKey(event, this.session);
    }
    if (this.session.index === this.session.keystrokes.length) {
      this.session.closed = true;
    }
  }

  private terminateSession(): void {
    clearInterval(this.session.intervalId);
    this.session.endTime = new Date();
    setTimeout(() => this.inputRef.nativeElement.focus(), 50);
  }

  private setupText(wikiExtract: string): void {
    this.clearSession();
    wikiExtract.split('').forEach((char: string) => {
      this.session.keystrokes.push({ source: char } as IKeystroke);
    });
    setTimeout(() => this.textInputRef.nativeElement.focus());
  }
}

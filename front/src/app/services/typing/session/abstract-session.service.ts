import { Injectable, Signal } from '@angular/core';
import { SessionService } from './session.service';
import { IKeystroke, TypingSession } from '../../../models/classes/TypingSession';
import { isUndefined } from '../../../utils/checks';
import { AbstractLayoutService } from '../keyboard-layouts/abstract-layout.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractSessionService {
  session: Signal<TypingSession> = this.sessionInfo.session;

  protected constructor(protected readonly sessionInfo: SessionService,
                        protected readonly layoutService: AbstractLayoutService) {
  }

  processKeyPressed(event: KeyboardEvent): void {
    if (this.isIgnored(event)) {
      return;
    }
    this.startTimer();
    if (this.layoutService.isRestartKey(event)) {
      this.restartSession();
    } else {
      this.updateSession(event);
      if (this.session().index === this.session().keystrokes.length) {
        this.session().status.set('closed');
        this.terminateSession();
      }
    }
  };

  protected abstract updateSession(event: KeyboardEvent): void;

  protected abstract isIgnored(event: KeyboardEvent): boolean;

  setUpSession(text: string): void {
    this.sessionInfo.resetSession();
    [...text].forEach((char: string) =>
      this.session().keystrokes.push({ source: char, disabled: !this.layoutService.isEnabled(char) } as IKeystroke)
    );
  }

  resetSession(): void {
    this.sessionInfo.resetSession();
  }

  protected startTimer(): void {
    if (isUndefined(this.session().startTime)) {
      this.session().startTime = new Date();
      this.session().status.set('inProgress');
      this.session().intervalId = setInterval(() => {
        this.session().endTime = new Date();
        this.sessionInfo.nextTypingData();
      }, 100);
    }
  }

  protected terminateSession(): void {
    clearInterval(this.session().intervalId);
    this.session().endTime = new Date();
    this.sessionInfo.nextTypingData();
  }

  protected restartSession(): void {
    const tempKeystrokes: IKeystroke[] = this.session().keystrokes.map((keystroke: IKeystroke) => {
      keystroke.key = undefined;
      keystroke.keySequence = undefined;
      return keystroke;
    });
    this.sessionInfo.resetSession();
    this.sessionInfo.nextTypingData();
    this.session().keystrokes = tempKeystrokes;
  }

  protected incrementIndex(session: TypingSession): void {
    session.keystrokeErrors += !this.layoutService.isInputCorrect(session.keystrokes[session.index]) ? 1 : 0;
    session.keystrokeTotal++;
    session.index++;
    this.skipDisabledForward(session);
  }

  protected skipDisabledForward(session: TypingSession): void {
    while (session.keystroke?.disabled && isUndefined(session!.keystroke.keySequence)) {
      session.index++;
    }
  }

  protected decrementIndex(session: TypingSession): void {
    session.index--;
    this.skipDisabledBackward(session);
    session.keystroke!.key = undefined;
    session.keystroke!.keySequence = undefined;
  }

  protected skipDisabledBackward(session: TypingSession): void {
    while (session.keystroke!.disabled) {
      session.index--;
    }
  }
}

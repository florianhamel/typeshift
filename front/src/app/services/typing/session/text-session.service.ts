import { Inject, Injectable } from '@angular/core';
import { AbstractSessionService } from './abstract-session.service';
import { KEYBOARD_LAYOUT_TOKEN } from '../../../components/typing/typing.module';
import { SessionService } from './session.service';
import { AbstractLayoutService } from '../keyboard-layouts/abstract-layout.service';
import { isDefined } from '../../../utils/checks';
import { isSpace } from '../../../utils/char';

@Injectable({
  providedIn: 'root'
})
export class TextSessionService extends AbstractSessionService {

  constructor(sessionInfo: SessionService,
              @Inject(KEYBOARD_LAYOUT_TOKEN) layoutService: AbstractLayoutService) {
    super(sessionInfo, layoutService);
  }

  protected isIgnored(event: KeyboardEvent): boolean {
    return (this.session().closed || this.layoutService.isRepeat(event) ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft');
  }

  protected updateSession(event: KeyboardEvent): void {
    if (this.layoutService.isSequenceKey(event, this.session())) {
      this.processSequenceKey(event);
    } else if (this.layoutService.isBackspaceKey(event)) {
      this.processBackspaceKey(event);
    } else if (this.layoutService.isInputKey(event)) {
      this.processInputKey(event);
    }
  }

  private processSequenceKey(event: KeyboardEvent): void {
    if (this.layoutService.isSequenceEmpty(this.session())) {
      this.startSequence(event);
    } else {
      this.continueSequence(event);
    }
  }

  private processBackspaceKey(event: KeyboardEvent): void {
    if (this.layoutService.isWordBackspaceKey(event) && this.session().index > 0) {
      this.processWordBackspaceKey();
    } else if (this.session().index > 0) {
      this.decrementIndex(this.session());
    }
  }

  private processWordBackspaceKey(): void {
    while (isDefined(this.session().lastKeystroke?.source) && isSpace(this.session().lastKeystroke!.source as string)) {
      this.decrementIndex(this.session());
    }
    while (isDefined(this.session().lastKeystroke?.source) && !isSpace(this.session().lastKeystroke!.source as string)) {
      this.decrementIndex(this.session());
    }
  }

  private processInputKey(event: KeyboardEvent): void {
    this.session().keystroke!.key = event.key;
    this.incrementIndex(this.session());
  }

  private startSequence(event: KeyboardEvent): void {
    this.session().keystroke!.keySequence = this.layoutService.getSequenceStarter(event);
  }

  private continueSequence(event: KeyboardEvent): void {
    this.session().keystroke!.keySequence += event.key;
    if (this.layoutService.isSequenceValid(this.session())) {
      this.session().keystroke!.key = this.layoutService.getSequenceValue(this.session().keystroke!.keySequence as string);
      this.session().keystroke!.keySequence = undefined;
      this.incrementIndex(this.session());
    } else {
      this.session().keystroke!.key = this.session().keystroke!.keySequence?.charAt(0);
      if (isDefined(this.session().nextKeystroke)) {
        this.session().nextKeystroke!.key = this.session().keystroke!.keySequence?.charAt(1);
        this.incrementIndex(this.session());
      }
      this.session().keystroke!.keySequence = undefined;
      this.incrementIndex(this.session());
    }
  }
}

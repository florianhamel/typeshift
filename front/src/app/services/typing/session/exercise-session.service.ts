import { Inject, Injectable } from '@angular/core';
import { AbstractSessionService } from './abstract-session.service';
import { SessionService } from './session.service';
import { KEYBOARD_LAYOUT_TOKEN } from '../../../components/typing/typing.module';
import { AbstractLayoutService } from '../keyboard-layouts/abstract-layout.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseSessionService extends AbstractSessionService {

  constructor(sessionInfo: SessionService,
              @Inject(KEYBOARD_LAYOUT_TOKEN) layoutService: AbstractLayoutService) {
    super(sessionInfo, layoutService);
  }

  protected isIgnored(event: KeyboardEvent): boolean {
    return (this.session().closed || this.layoutService.isRepeat(event) ||
      this.layoutService.isBackspaceKey(event));
  }

  protected updateSession(event: KeyboardEvent): void {
    if (this.layoutService.isInputKey(event)) {
      this.processInputKey(event);
    }
  }

  private processInputKey(event: KeyboardEvent): void {
    this.session().keystroke!.key = event.key;
    if (this.layoutService.isInputCorrect(this.session().keystroke!)) {
      this.incrementIndex(this.session());
    } else {
      this.session().keystrokeErrors++;
      this.session().keystrokeTotal++;
    }
  }
}

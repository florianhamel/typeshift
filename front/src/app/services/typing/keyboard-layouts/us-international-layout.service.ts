import { Injectable } from '@angular/core';
import { TypingSession } from '../../../models/classes/TypingSession';
import { LatinAlphabetService } from '../alphabets/latin-alphabet.service';
import { isDefined, isUndefined } from '../../../utils/checks';
import { IKeyEvent } from '../../../models/interfaces/typing';
import { AbstractLayoutService } from './abstract-layout.service';

@Injectable({
  providedIn: 'root'
})
export class UsInternationalLayout extends AbstractLayoutService {
  sequenceStarterKeys: Map<string, IKeyEvent> = new Map<string, IKeyEvent>();
  sequenceKeys: Map<string, string> = new Map<string, string>();

  constructor(private readonly latinService: LatinAlphabetService) {
    super();
    this.latinService.buildSequenceStarterKeys(this.sequenceStarterKeys);
    this.latinService.buildAllSequenceKeys(this.sequenceKeys);
  }

  isEnabled(key: string): boolean {
    return (/^[ -~\n]*$/.test(key) || [...this.sequenceKeys.values()].includes(key));
  }

  isSequenceKey(event: KeyboardEvent, session: TypingSession): boolean {
    return (this.isDeadKey(event) && this.sequenceStarterKeys.has(event.code)) ||
      (this.isInputKey(event) && isDefined(session.keystrokes[session.index]?.keySequence));
  }

  isSequenceEmpty(session: TypingSession): boolean {
    return isUndefined(session.keystrokes[session.index]?.keySequence);
  }

  isSequenceValid(session: TypingSession): boolean {
    return this.sequenceKeys.has(session.keystroke!.keySequence as string);
  }

  getSequenceStarter(event: KeyboardEvent): string {
    if (this.isQuoteKey(event)) {
      return (event.shiftKey ? '\"' : '\'');
    } else if (this.isBackquoteKey(event)) {
      return (event.shiftKey ? '~' : '`');
    } else {
      return '^';
    }
  }

  getSequenceValue(key: string): string | undefined {
    return this.sequenceKeys.get(key);
  }
}

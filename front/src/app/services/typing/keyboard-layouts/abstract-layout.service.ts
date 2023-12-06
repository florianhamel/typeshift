import { Injectable } from '@angular/core';
import { IKeystroke, TypingSession } from '../../../models/classes/TypingSession';
import { IKeyEvent } from '../../../models/interfaces/typing';

export const RETURN_UNICODE: string = '\u23CE';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractLayoutService {
  functionalKeys: Set<string> = new Set<string>(['ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
    'Home',
    'End',
    'Shift',
    'Control',
    'Meta',
    'Alt',
    'Tab'
  ]);

  abstract sequenceStarterKeys: Map<string, IKeyEvent>;

  abstract sequenceKeys: Map<string, string>;

  protected constructor() {
  }

  abstract isEnabled(key: string): boolean;

  abstract isSequenceKey(event: KeyboardEvent, session: TypingSession): boolean;

  abstract isSequenceEmpty(session: TypingSession): boolean;

  abstract isSequenceValid(session: TypingSession): boolean;

  abstract getSequenceStarter(event: KeyboardEvent): string;

  abstract getSequenceValue(key: string): string | undefined;

  isRepeat(event: KeyboardEvent): boolean {
    return !this.isBackspaceKey(event) && event.repeat;
  }

  isRestartKey(event: KeyboardEvent): boolean {
    return (event.key === 'Escape');
  }

  isBackspaceKey(event: KeyboardEvent): boolean {
    return (event.key === 'Backspace');
  }

  isWordBackspaceKey(event: KeyboardEvent): boolean {
    return (event.key === 'Backspace' && (event.altKey || event.ctrlKey));
  }

  isInputKey(event: KeyboardEvent): boolean {
    return !this.isFunctionalKey(event);
  }

  isInputCorrect(keystroke: IKeystroke): boolean {
    if (keystroke.key === 'Enter' && keystroke.source === '\n') {
      return true;
    }
    return (keystroke.key === keystroke.source);
  }

  protected isFunctionalKey(event: KeyboardEvent): boolean {
    return this.functionalKeys.has(event.key);
  }

  protected isDeadKey(event: KeyboardEvent): boolean {
    return (event.key === 'Dead');
  }

  protected isQuoteKey(event: KeyboardEvent): boolean {
    return (event.code === 'Quote');
  }

  protected isBackquoteKey(event: KeyboardEvent): boolean {
    return (event.code === 'Backquote');
  }
}

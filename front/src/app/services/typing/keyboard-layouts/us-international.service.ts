import { Injectable } from '@angular/core';
import { IKeyboardLayout } from './IKeyboardLayout';
import { IKeystroke, TypingSession } from '../../../models/TypingSession';
import { LatinAlphabetService } from '../alphabets/latin-alphabet.service';
import { isDefined, isUndefined } from '../../../utils/checks';

export interface IKeyEvent {
  key: string;
  code?: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}

const RESTART_KEY: string = 'Escape';

const FUNCTIONAL_KEYS: Set<string> = new Set<string>([
  'ArrowUp',
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

@Injectable({
  providedIn: 'root'
})
export class UsInternationalService implements IKeyboardLayout {
  restartKey: string = RESTART_KEY;
  functionalKeys: Set<string> = FUNCTIONAL_KEYS;
  sequenceStarterKeys: Map<string, IKeyEvent> = new Map();
  sequenceKeys: Map<string, string> = new Map();

  constructor(private readonly latin: LatinAlphabetService) {
    this.latin.buildSequenceStarterKeys(this.sequenceStarterKeys);
    this.latin.buildAllSequenceKeys(this.sequenceKeys);
  }

  isRepeat(event: KeyboardEvent): boolean {
    return !this.isBackspaceKey(event) && event.repeat;
  }

  isRestartKey(event: KeyboardEvent): boolean {
    return (event.key === this.restartKey);
  }

  isSequenceKey(event: KeyboardEvent, session: TypingSession): boolean {
    return (this.isDeadKey(event) && this.sequenceStarterKeys.has(event.code)) ||
      (this.isInputKey(event) && isDefined(session.keystrokes[session.index]?.keySequence));
  }

  processSequenceKey(event: KeyboardEvent, session: TypingSession): void {
    if (this.isStartingSequenceKey(session)) {
      this.startSequence(event, session);
    } else {
      this.continueSequence(event, session);
    }
  }

  isBackspaceKey(event: KeyboardEvent): boolean {
    return (event.key === 'Backspace');
  }

  processBackspaceKey(event: KeyboardEvent, session: TypingSession): void {
    if (this.isWordBackspaceKey(event) && session.index > 0) {
      while (isDefined(session.lastKeystroke?.source) && this.isWhiteSpace(session.lastKeystroke!.source as string)) {
        this.decrementIndex(session);
      }
      while (isDefined(session.lastKeystroke?.source) && !this.isWhiteSpace(session.lastKeystroke!.source as string)) {
        this.decrementIndex(session);
      }
    } else if (session.index > 0) {
      this.decrementIndex(session);
    }
  }

  isInputKey(event: KeyboardEvent): boolean {
    return !this.isFunctionalKey(event);
  }

  processInputKey(event: KeyboardEvent, session: TypingSession): void {
    session.keystrokes[session.index].key = event.key;
    this.incrementIndex(session);
  }

  private startSequence(event: KeyboardEvent, session: TypingSession): void {
    if (this.isQuoteKey(event)) {
      session.keystroke.keySequence = event.shiftKey ? '\"' : '\'';
    } else if (this.isBackquoteKey(event)) {
      session.keystroke.keySequence = event.shiftKey ? '~' : '`';
    } else {
      session.keystroke.keySequence = 'ˆ';
    }
  }

  private continueSequence(event: KeyboardEvent, session: TypingSession): void {
    session.keystroke.keySequence += event.key;
    if (this.sequenceKeys.has(session.keystroke.keySequence as string)) {
      session.keystroke.key = this.sequenceKeys.get(session.keystroke.keySequence as string);
      session.keystroke.keySequence = undefined;
      this.incrementIndex(session);
    } else {
      session.keystroke.key = session.keystroke.keySequence?.charAt(0);
      if (isDefined(session.nextKeystroke)) {
        session.nextKeystroke!.key = session.keystroke.keySequence?.charAt(1);
        this.incrementIndex(session);
      }
      session.keystroke.keySequence = undefined;
      this.incrementIndex(session);
    }
  }

  private incrementIndex(session: TypingSession): void {
    session.keystrokeErrors += this.isKeystrokeError(session.keystrokes[session.index]) ? 1 : 0;
    session.keystrokeTotal++;
    session.index++;
  }

  private decrementIndex(session: TypingSession): void {
    session.index--;
    session.keystroke.key = undefined;
    session.keystroke.keySequence = undefined;
  }

  private isStartingSequenceKey(session: TypingSession): boolean {
    return isUndefined(session.keystrokes[session.index]?.keySequence);
  }

  private isWordBackspaceKey(event: KeyboardEvent): boolean {
    return (event.key === 'Backspace' && (event.altKey || event.ctrlKey));
  }

  private isFunctionalKey(event: KeyboardEvent): boolean {
    return this.functionalKeys.has(event.key);
  }

  private isDeadKey(event: KeyboardEvent): boolean {
    return (event.key === 'Dead');
  }

  private isKeystrokeError(keystroke: IKeystroke): boolean {
    return (keystroke.source !== keystroke.key);
  }

  private isQuoteKey(event: KeyboardEvent): boolean {
    return (event.code === 'Quote');
  }

  private isBackquoteKey(event: KeyboardEvent): boolean {
    return (event.code === 'Backquote');
  }

  private isWhiteSpace(key: string) {
    return /\s/.test(key);
  }
}
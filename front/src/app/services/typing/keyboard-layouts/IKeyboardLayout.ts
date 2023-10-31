/*****

 There are 2 possibilities for every entry input:
 - A key
 - A key sequence

 *****/
import { IKeystroke, TypingSession } from '../../../models/TypingSession';

export const RETURN_UNICODE: string = '\u23CE';

export interface IKeyEvent {
  key: string;
  code?: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}

export interface IKeyboardLayout {
  isRepeat(event: KeyboardEvent): boolean;

  isRestartKey(event: KeyboardEvent): boolean;

  isInputKey(event: KeyboardEvent): boolean;

  processInputKey(event: KeyboardEvent, session: TypingSession): void;

  isSequenceKey(event: KeyboardEvent, session: TypingSession): boolean;

  processSequenceKey(event: KeyboardEvent, session: TypingSession): void;

  isBackspaceKey(event: KeyboardEvent): boolean;

  processBackspaceKey(event: KeyboardEvent, session: TypingSession): void;

  isEnabled(key: string): boolean;

  isInputCorrect(keystroke: IKeystroke): boolean;
}

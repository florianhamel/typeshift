/*****

 There are 2 possibilities for every entry input:
 - A key
 - A key sequence

 *****/
import { TypingSession } from '../../../models/TypingSession';
import { IKeyEvent } from './us-international.service';

export interface IKeyboardLayout {
  restartKey: string;
  functionalKeys: Set<string>;
  sequenceStarterKeys: Map<string, IKeyEvent>;

  isRepeat(event: KeyboardEvent): boolean;
  isRestartKey(event: KeyboardEvent): boolean;

  isInputKey(event: KeyboardEvent): boolean;
  processInputKey(event: KeyboardEvent, session: TypingSession): void;

  isSequenceKey(event: KeyboardEvent, session: TypingSession): boolean;
  processSequenceKey(event: KeyboardEvent, session: TypingSession): void;

  isBackspaceKey(event: KeyboardEvent): boolean;
  processBackspaceKey(event: KeyboardEvent, session: TypingSession): void;
}

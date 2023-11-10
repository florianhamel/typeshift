import { TypingType } from '../enums/TypingType';

export interface IWikiData {
  title: string | undefined;
  extract: string | undefined;
}

export interface ITypingSessionInfo {
  type: TypingType;
  label?: string;
}

export interface IKeyEvent {
  key: string;
  code?: string;
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
}

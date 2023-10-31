import { Injectable } from '@angular/core';
import { IKeyEvent } from '../keyboard-layouts/IKeyboardLayout';

@Injectable({
  providedIn: 'root'
})
export class LatinAlphabetService {
  constructor() {
  }

  buildSequenceStarterKeys(sequenceStarterKeys: Map<string, IKeyEvent>): void {
    sequenceStarterKeys.set('Quote', { key: 'Dead', shiftKey: false });
    sequenceStarterKeys.set('Quote', { key: 'Dead', shiftKey: true });
    sequenceStarterKeys.set('Backquote', { key: 'Dead', shiftKey: false });
    sequenceStarterKeys.set('Backquote', { key: 'Dead', shiftKey: true });
    sequenceStarterKeys.set('Digit6', { key: 'Dead', shiftKey: true });
  }

  buildAllSequenceKeys(sequenceKeys: Map<string, string>): void {
    this.buildSequenceSpecial(sequenceKeys);
    this.buildSequenceLetterA(sequenceKeys);
    this.buildSequenceLetterE(sequenceKeys);
    this.buildSequenceLetterI(sequenceKeys);
    this.buildSequenceLetterO(sequenceKeys);
    this.buildSequenceLetterU(sequenceKeys);
    this.buildSequenceLetterY(sequenceKeys);
    this.buildSequenceLetterN(sequenceKeys);
    this.buildSequenceLetterC(sequenceKeys);
  }

  buildSequenceSpecial(sequenceKeys: Map<string, string>): void {
    sequenceKeys.set('\' ', '\'');
    sequenceKeys.set('\" ', '\"');
    sequenceKeys.set('` ', '`');
    sequenceKeys.set('~ ', '~');
    sequenceKeys.set('^ ', '^');
  }

  buildSequenceLetterA(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\'a', 'á');
    sequenceKeys.set('\"a', 'ä');
    sequenceKeys.set('`a', 'à');
    sequenceKeys.set('~a', 'ã');
    sequenceKeys.set('^a', 'â');
    // Uppercase
    sequenceKeys.set('\'A', 'Á');
    sequenceKeys.set('\"A', 'Ä');
    sequenceKeys.set('`A', 'À');
    sequenceKeys.set('~A', 'Ã');
    sequenceKeys.set('^A', 'Â');
  }

  buildSequenceLetterE(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\'e', 'é');
    sequenceKeys.set('\"e', 'ë');
    sequenceKeys.set('`e', 'è');
    sequenceKeys.set('^e', 'ê');
    // Uppercase
    sequenceKeys.set('\'E', 'É');
    sequenceKeys.set('\"E', 'Ë');
    sequenceKeys.set('`E', 'È');
    sequenceKeys.set('^E', 'Ê');
  }

  buildSequenceLetterI(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\'i', 'í');
    sequenceKeys.set('\"i', 'ï');
    sequenceKeys.set('`i', 'ì');
    sequenceKeys.set('^i', 'î');
    // Uppercase
    sequenceKeys.set('\'I', 'Í');
    sequenceKeys.set('\"I', 'Ï');
    sequenceKeys.set('`I', 'Ì');
    sequenceKeys.set('^I', 'Î');
  }

  buildSequenceLetterO(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\'o', 'ó');
    sequenceKeys.set('\"o', 'ö');
    sequenceKeys.set('`o', 'ò');
    sequenceKeys.set('~o', 'õ');
    sequenceKeys.set('^o', 'ô');
    // Uppercase
    sequenceKeys.set('\'O', 'Ó');
    sequenceKeys.set('\"O', 'Ö');
    sequenceKeys.set('`O', 'Ò');
    sequenceKeys.set('~O', 'Õ');
    sequenceKeys.set('^O', 'Ô');
  }

  buildSequenceLetterU(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\'u', 'ú');
    sequenceKeys.set('\"u', 'ü');
    sequenceKeys.set('`u', 'ù');
    sequenceKeys.set('^u', 'û');
    // Uppercase
    sequenceKeys.set('\'U', 'Ú');
    sequenceKeys.set('\"U', 'Ü');
    sequenceKeys.set('`U', 'Ù');
    sequenceKeys.set('^U', 'Û');
  }

  buildSequenceLetterY(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('\"y', 'ÿ');
    // Uppercase
    sequenceKeys.set('\"Y', 'Ÿ');
  }

  buildSequenceLetterN(sequenceKeys: Map<string, string>): void {
    // Lowercase
    sequenceKeys.set('~n', 'ñ');
    // Uppercase
    sequenceKeys.set('~N', 'Ñ');
  }

  buildSequenceLetterC(sequenceKeys: Map<string, string>): void {
    sequenceKeys.set('\'c', 'ç');
    sequenceKeys.set('\'C', 'Ç');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypingService {
  ignoredKeys: Set<string> = new Set(['Dead', 'Shift', 'CapsLock', 'Tab']);
  nonCharKeys: Set<string> = new Set(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Home', 'End',
    'Control', 'Meta', 'Alt']);


  constructor() {
  }

  formatText(text: string): string {
    return text.replace(/\s/g, ' ');
  }

  checkIsRestart(key: string): boolean {
    return (key === 'Escape');
  }

  checkIsInput(key: string): boolean {
    return !this.ignoredKeys.has(key);
  }

  checkInputIsChar(key: string): boolean {
    return !this.nonCharKeys.has(key);
  }

  // At some point, this method should handle International Keyboards for accents, quotes, etc...
  checkInputValidity(textRef: string, textInput: string): boolean {
    return (textRef === textInput);
  }
}

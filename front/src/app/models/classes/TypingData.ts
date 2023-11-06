export class TypingData {
  wpm: number = 0;
  keystrokes: number = 0;
  keystrokeErrors: number = 0;

  get accuracy(): number {
    return 100 - (this.keystrokeErrors / this.keystrokes * 100);
  }
}

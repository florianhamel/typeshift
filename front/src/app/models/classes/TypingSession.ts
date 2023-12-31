import { isDefined } from '../../utils/checks';
import { TSessionStatus } from '../types';
import { signal, WritableSignal } from '@angular/core';

export interface IKeystroke {
  source: string;
  key: string | undefined;
  keySequence: string | undefined;
  disabled: boolean;
}

export class TypingSession {
  intervalId!: number | undefined;
  startTime!: Date;
  endTime!: Date;
  index: number = 0;
  keystrokes: IKeystroke[] = [];
  keystrokeTotal: number = 0;
  keystrokeErrors: number = 0;
  status: WritableSignal<TSessionStatus> = signal<TSessionStatus>('notStarted');

  get keystroke(): IKeystroke | undefined {
    return this.keystrokes[this.index];
  }

  get nextKeystroke(): IKeystroke | undefined {
    if (this.index + 1 <= this.keystrokes.length) {
      return this.keystrokes[this.index + 1];
    }
    return undefined;
  }

  get lastKeystroke(): IKeystroke | undefined {
    if (0 < this.index) {
      return this.keystrokes[this.index - 1];
    }
    return undefined;
  }

  get seconds(): number {
    return (this.endTime?.getTime() - this.startTime?.getTime()) / 1000;
  }

  get wpm(): number {
    const words: number = this.keystrokes.filter((keystroke: IKeystroke) =>
      isDefined(keystroke.key) && (keystroke.key === keystroke.source)).length / 5;
    const minutes: number = Math.round(this.seconds) / 60;
    return (minutes > 0 && words >= 1) ? Math.round(words / minutes) : NaN;
  }

  get accuracy(): number {
    return 100 - (this.keystrokeErrors * 100 / this.keystrokeTotal);
  }

  get notStarted(): boolean {
    return (this.status() === 'notStarted');
  }

  get inProgress(): boolean {
    return (this.status() === 'inProgress');
  }

  get closed(): boolean {
    return (this.status() === 'closed');
  }
}

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFinger, IKeyboardKey, KeyboardService } from '../../../services/typing/course/keyboard.service';
import { isDefined } from '../../../utils/checks';

export interface IKeyboardKeyData {
  char: string;
  source: string;
  key?: string;
  finger?: IFinger;
}

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent implements OnInit, OnChanges {
  @Input() source: string | undefined;
  @Input() key: string | undefined;

  keyboard!: IKeyboardKey[][];
  hands!: IFinger[][];

  currentKeyboardKey: IKeyboardKey | undefined;

  timer!: Date;

  constructor(private readonly keyboardService: KeyboardService) {
  }

  ngOnInit(): void {
    this.keyboard = this.keyboardService.buildKeyboard();
    this.hands = this.keyboardService.buildHands();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('source')) {
      this.currentKeyboardKey = this.keyboard?.flat().find(keyboardKey => (keyboardKey.char === this.source));
    }
    if (Object.keys(changes).includes('key')) {
      this.timer = new Date();
    }
  }

  isCurrentKey(keyboardKey: IKeyboardKey): boolean {
    return (keyboardKey === this.currentKeyboardKey);
  }

  isWrongKey(keyboardKey: IKeyboardKey): boolean {
    const timeDiff: number | undefined = new Date().getTime() - this.timer?.getTime();
    return (isDefined(this.key) && (timeDiff < 1000) && (this.key !== this.source) && keyboardKey.char === this.key);
  }

  isCurrentFinger(finger: IFinger): boolean {
    return ((this.currentKeyboardKey?.finger?.name === finger.name) && (this.currentKeyboardKey!.finger!.hand === finger.hand));
  }

  displayKey(keyboardKey: IKeyboardKey): string {
    return keyboardKey.display ?? keyboardKey.char.toUpperCase();
  }

  displayShiftKey(keyboardKey: IKeyboardKey): string | undefined {
    return (this.isLetter(keyboardKey) ? undefined : keyboardKey.shiftChar);
  }

  keyColor(keyboardKey: IKeyboardKey): string {
    if (this.isCurrentKey(keyboardKey)) {
      return keyboardKey.finger!.color!;
    }
    return this.keyboardService.neutralColor;
  }

  fingerColor(finger: IFinger): string {
    if (this.isCurrentFinger(finger)) {
      return this.currentKeyboardKey!.finger!.color!;
    }
    return this.keyboardService.neutralColor;
  }

  private isLetter(keyboardKey: IKeyboardKey): boolean {
    return isDefined(keyboardKey.shiftChar) && /^[A-Z]$/.test(keyboardKey.shiftChar!);
  }
}

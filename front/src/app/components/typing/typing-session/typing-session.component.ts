import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { IKeystroke, TypingSession } from '../../../models/classes/TypingSession';
import { isNewLine } from '../../../utils/char';
import { IKeyboardLayout, RETURN_UNICODE } from '../../../services/typing/keyboard-layouts/IKeyboardLayout';
import { isDefined, isUndefined } from '../../../utils/checks';
import { KEYBOARD_LAYOUT_TOKEN } from '../typing.module';
import { ITypingData } from '../typing-data/typing-data.component';

@Component({
  selector: 'app-typing-session',
  templateUrl: './typing-session.component.html',
  styleUrls: ['./typing-session.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingSessionComponent implements OnChanges {
  @Input() text!: string;

  @Output() sessionClosed: EventEmitter<TypingSession> = new EventEmitter<TypingSession>();
  @Output() typingDataUpdate: EventEmitter<ITypingData> = new EventEmitter<ITypingData>();

  @ViewChild('textInputRef') textInputRef!: ElementRef;
  @ViewChildren('keystrokeListRef') keystrokeListRef!: QueryList<ElementRef>;

  offsetTop!: number;
  session: TypingSession = new TypingSession();
  textInputFocused: boolean = false;

  constructor(@Inject(KEYBOARD_LAYOUT_TOKEN) private readonly keyboardService: IKeyboardLayout) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes('text')) {
      this.setupText(this.text);
    }
  }

  keyPressed(event: KeyboardEvent): void {
    if (this.session.closed || this.keyboardService.isRepeat(event)) {
      return;
    }
    this.startTimer();
    if (this.keyboardService.isRestartKey(event)) {
      this.restartSession();
    } else {
      this.updateSession(event);
      if (this.session.closed) {
        this.terminateSession();
      } else {
        this.scroll();
      }
    }
  }

  formattedKeystroke(keystroke: IKeystroke): string {
    if (isNewLine(keystroke.source)) {
      return RETURN_UNICODE + '\n';
    }
    return keystroke.source;
  }

  isInputCorrect(keystroke: IKeystroke): boolean {
    return this.keyboardService.isInputCorrect(keystroke);
  }

  isInputIncorrect(keystroke: IKeystroke): boolean {
    return (isDefined(keystroke.key) && !this.keyboardService.isInputCorrect(keystroke));
  }

  isCurrent(index: number): boolean {
    return (index === this.session.index);
  }

  private setupText(text: string): void {
    this.clearSession();
    [...text].forEach((char: string) =>
      this.session.keystrokes.push({ source: char, disabled: !this.keyboardService.isEnabled(char) } as IKeystroke)
    );
    setTimeout(() => {
      this.offsetTop = this.keystrokeListRef.first.nativeElement.offsetTop;
      this.textInputRef.nativeElement.focus();
      this.textInputRef.nativeElement.scrollTo({ top: 0 });
    });
  }

  private restartSession(): void {
    const tempKeystrokes: IKeystroke[] = this.session.keystrokes.map((keystroke: IKeystroke) => {
      keystroke.key = undefined;
      keystroke.keySequence = undefined;
      return keystroke;
    });
    this.clearSession();
    this.emitTypingData();
    this.session.keystrokes = tempKeystrokes;
    this.textInputRef.nativeElement.scrollTo({ top: 0 });
  }

  private clearSession(): void {
    clearInterval(this.session.intervalId);
    this.session = new TypingSession();
  }

  private startTimer(): void {
    if (isUndefined(this.session.startTime)) {
      this.session.startTime = new Date();
      this.session.intervalId = setInterval(() => {
        this.session.endTime = new Date();
        this.emitTypingData();
      }, 50);
    }
  }

  private updateSession(event: KeyboardEvent): void {
    if (this.keyboardService.isSequenceKey(event, this.session)) {
      this.keyboardService.processSequenceKey(event, this.session);
    } else if (this.keyboardService.isBackspaceKey(event)) {
      this.keyboardService.processBackspaceKey(event, this.session);
    } else if (this.keyboardService.isInputKey(event)) {
      this.keyboardService.processInputKey(event, this.session);
    }
    if (this.session.index === this.session.keystrokes.length) {
      this.session.closed = true;
    }
  }

  private scroll(): void {
    const current: ElementRef = this.keystrokeListRef.get(this.session.index)!;
    this.textInputRef.nativeElement.scrollTo({ top: current.nativeElement.offsetTop - this.offsetTop });
  }

  private terminateSession(): void {
    clearInterval(this.session.intervalId);
    this.session.endTime = new Date();
    this.emitTypingData();
    this.sessionClosed.emit(this.session);
  }

  private emitTypingData(): void {
    this.typingDataUpdate.emit({
      wpm: this.session.wpm,
      accuracy: this.session.accuracy,
      seconds: this.session.seconds
    });
  }
}

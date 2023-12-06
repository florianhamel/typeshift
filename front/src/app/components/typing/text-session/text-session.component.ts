import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  Signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { IKeystroke, TypingSession } from '../../../models/classes/TypingSession';
import { isNewLine } from '../../../utils/char';
import { isDefined } from '../../../utils/checks';
import { KEYBOARD_LAYOUT_TOKEN } from '../typing.module';
import { TextSessionService } from '../../../services/typing/session/text-session.service';
import {
  AbstractLayoutService,
  RETURN_UNICODE
} from '../../../services/typing/keyboard-layouts/abstract-layout.service';
import { ITypingSessionInfo } from '../../../models/interfaces/typing';
import { TypingType } from '../../../models/enums/TypingType';
import { UserInfo } from '../../../services/user/user-info.service';
import { TypingService } from '../../../services/typing/typing.service';

export interface ITextData {
  text?: string;
  label?: string;
  type: TypingType;
}

@Component({
  selector: 'app-text-session',
  templateUrl: './text-session.component.html',
  styleUrls: ['./text-session.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSessionComponent implements OnInit, AfterViewInit {
  @Input() textData!: ITextData;

  @ViewChild('textInputRef') textInputRef!: ElementRef;
  @ViewChildren('keystrokeListRef') keystrokeListRef!: QueryList<ElementRef>;

  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');

  session: Signal<TypingSession> = this.sessionService.session;
  offsetTop!: number;
  textInputFocused: boolean = false;

  constructor(private readonly sessionService: TextSessionService,
              private readonly typingService: TypingService,
              private readonly userInfo: UserInfo,
              @Inject(KEYBOARD_LAYOUT_TOKEN) private readonly layoutService: AbstractLayoutService) {
  }


  ngOnInit(): void {
    this.sessionService.setUpSession(this.textData.text!);
  }

  ngAfterViewInit(): void {
    this.offsetTop = this.keystrokeListRef.first.nativeElement.offsetTop;
    this.textInputRef.nativeElement.focus();
  }

  keyPressed(event: KeyboardEvent): void {
    this.sessionService.processKeyPressed(event);
    if (this.session().closed) {
      this.terminateSession();
    } else if (this.session().inProgress) {
      this.scrollLine();
    } else {
      this.scrollReset();
    }
  }

  terminateSession(): void {
    this.userInfo.refreshStatus();
    const sessionInfo: ITypingSessionInfo = {
      type: TypingType.WIKI,
      label: this.textData.label
    };
    if (this.isAuthenticated()) {
      this.typingService.postSession(this.session(), sessionInfo);
    } else {
      this.typingService.storeSession(this.session(), sessionInfo);
    }
  }

  formattedKeystroke(keystroke: IKeystroke): string {
    if (isNewLine(keystroke.source)) {
      return RETURN_UNICODE + '\n';
    }
    return keystroke.source;
  }

  isInputCorrect(keystroke: IKeystroke): boolean {
    return this.layoutService.isInputCorrect(keystroke);
  }

  isInputIncorrect(keystroke: IKeystroke): boolean {
    return (isDefined(keystroke.key) && !this.layoutService.isInputCorrect(keystroke));
  }

  isCurrent(index: number): boolean {
    return (index === this.session().index);
  }

  scrollReset(): void {
    this.textInputRef.nativeElement.scrollTo({ top: 0 });
  }

  scrollLine(): void {
    const current: ElementRef = this.keystrokeListRef.get(this.session().index)!;
    const offsetTopDiff: number = current.nativeElement.offsetTop - this.offsetTop;
    if (offsetTopDiff !== 0) {
      this.textInputRef.nativeElement.scrollTo({ top: offsetTopDiff });
    }
  }
}

import { Component, ElementRef, Inject, Signal, ViewChild } from '@angular/core';
import { IKeystroke, TypingSession } from '../../../models/TypingSession';
import { IKeyboardLayout } from '../../../services/typing/keyboard-layouts/IKeyboardLayout';
import { KEYBOARD_LAYOUT_TOKEN } from '../typing.module';
import { isDefined, isUndefined, nonNull } from '../../../utils/checks';
import { WikiService } from '../../../services/typing/wiki.service';
import { RETURN_UNICODE } from '../../../services/typing/keyboard-layouts/us-international.service';
import { TypingService } from '../../../services/typing/typing.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { AuthenticationComponent } from '../../common/log-in/authentication.component';
import { UserInfo } from '../../../services/user/user-info.service';

@Component({
  selector: 'app-typing-interface',
  templateUrl: './typing-interface.component.html',
  styleUrls: ['./typing-interface.component.less']
})
export class TypingInterfaceComponent {
  @ViewChild('textInputRef') textInputRef!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;
  authenticationDialogRef!: DialogRef<unknown, AuthenticationComponent>;

  session: TypingSession = new TypingSession();
  keyword: string = '';
  isLoading: boolean = false;
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  typingData = {
    title: 'Wiki Typing',
    donationLink: 'https://donate.wikimedia.org/'
  };

  constructor(private readonly wikiService: WikiService,
              private readonly typingService: TypingService,
              private readonly dialog: Dialog,
              private readonly userInfo: UserInfo,
              @Inject(KEYBOARD_LAYOUT_TOKEN) private readonly keyboard: IKeyboardLayout) {
  }

  testWikiApi(): void {
    this.wikiService.testWikiApi().subscribe({
      next: value => console.log(value)
    });
  }

  openAuthenticationDialog(isLogin: boolean): void {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    })
    const componentInstance: AuthenticationComponent | null = this.authenticationDialogRef.componentInstance;
    if (nonNull(componentInstance)) {
      componentInstance!.isLogIn = isLogin;
    }
  }

  updateText(): void { // TODO extract data source from typing interface?
    this.isLoading = true;
    this.session.keyword = this.keyword;
    this.wikiService.getWikiExtract(this.session.keyword, 'en').subscribe({
      next: (wikiExtract: string): void => this.setupText(wikiExtract),
      // error: (): void => this.setupText('Error\nType " ú Ê ê\'αβΦ\'ê and の, は, でした while you\'re here.')
      error: (): void => this.setupText('Very simple typing.')
      // error: (): void => this.setupText('Cats, enigmatic creatures, have fascinated humans for millennia. A cat\'s purr, a soothing vibration, is thought to have healing properties. Cats have retractable claws, a stealthy adaptation for hunting. The world\'s oldest pet cat was discovered in a 9500-year-old grave. Cats, natural acrobats, can jump up to six times their body length. They see better in low light, a nocturnal advantage. A group of cats is called a \'clowder.\' In ancient Egypt, cats were revered and even mummified. A cat\'s whiskers are highly sensitive, aiding in navigation. They communicate with subtle body language. Cats, independent yet affectionate, make wonderful companions. Fun, furry, and endlessly fascinating!')

    });
  }

  keyPressed(event: KeyboardEvent): void {
    if (this.session.closed || this.keyboard.isRepeat(event)) {
      return;
    }
    this.startTimer();
    if (this.keyboard.isRestartKey(event)) {
      this.restartSession();
    } else {
      this.updateSession(event);
      if (this.session.closed) {
        this.terminateSession();
      }
    }
    this.textInputRef.nativeElement.scrollTo({ top: Math.floor(this.session.index / 60) * 35 });
  }

  // TODO isAsciiChar() should be more generic
  formattedKeystroke(keystroke: IKeystroke): string {
    if (!this.keyboard.isAsciiChar(keystroke.source)) {
      keystroke.disabled = true;
    } else if (keystroke.source === '\n') {
      return RETURN_UNICODE + '\n';
    }
    return keystroke.source;
  }

  isInputCorrect(keystroke: IKeystroke): boolean {
    return this.keyboard.isInputCorrect(keystroke);
  }

  isInputIncorrect(keystroke: IKeystroke): boolean {
    return (isDefined(keystroke.key) && !this.keyboard.isInputCorrect(keystroke));
  }

  isCurrent(index: number): boolean {
    return (index === this.session.index);
  }

  private restartSession(): void {
    const tempKeystrokes: IKeystroke[] = this.session.keystrokes.map((keystroke: IKeystroke) => {
      keystroke.key = undefined;
      keystroke.keySequence = undefined;
      return keystroke;
    });
    this.clearSession();
    this.session.keystrokes = tempKeystrokes;
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
      }, 20);
    }
  }

  private updateSession(event: KeyboardEvent): void {
    if (this.keyboard.isSequenceKey(event, this.session)) {
      this.keyboard.processSequenceKey(event, this.session);
      this.skipDisabledForward();
    } else if (this.keyboard.isBackspaceKey(event)) {
      this.keyboard.processBackspaceKey(event, this.session);
      this.skipDisabledBackward();
    } else if (this.keyboard.isInputKey(event)) {
      this.keyboard.processInputKey(event, this.session);
      this.skipDisabledForward();
    }
    if (this.session.index === this.session.keystrokes.length) {
      this.session.closed = true;
    }
  }

  private skipDisabledForward(): void {
    while (this.session.keystroke?.disabled && isUndefined(this.session.keystroke.keySequence)) {
      this.session.index++;
    }
  }

  private skipDisabledBackward(): void {
    while (this.session.keystroke?.disabled) {
      this.session.index--;
    }
  }

  private terminateSession(): void {
    clearInterval(this.session.intervalId);
    this.session.endTime = new Date();
    setTimeout(() => {
      this.inputRef.nativeElement.select();
      this.inputRef.nativeElement.focus();
    }, 20);
  }

  private setupText(wikiExtract: string): void {
    this.clearSession();
    wikiExtract.split('').forEach((char: string) => {
      this.session.keystrokes.push({ source: char } as IKeystroke);
    });
    this.isLoading = false;
    setTimeout(() => {
      this.textInputRef.nativeElement.scrollTo({ top: 0 });
      this.textInputRef.nativeElement.focus();
    }, 20);
  }
}

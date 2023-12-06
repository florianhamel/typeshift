import { Component, ElementRef, HostListener, OnDestroy, Signal, ViewChild } from '@angular/core';
import { isDefined, isUndefined } from '../../../utils/checks';
import { AuthenticationComponent } from '../../common/authentication/authentication.component';
import { UserInfo } from '../../../services/user/user-info.service';
import { TypingSession } from '../../../models/classes/TypingSession';
import { TypingType } from '../../../models/enums/TypingType';
import { IWikiData } from '../../../models/interfaces/typing';
import { enterAnimation, leaveAnimation } from '../../../utils/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { SessionService } from '../../../services/typing/session/session.service';
import { WikiService } from '../../../services/typing/wiki/wiki.service';
import { ITextData } from '../text-session/text-session.component';

export interface IWikiObserver {
  next: (wikiData: IWikiData) => void;
  error: () => void;
}

@Component({
  selector: 'app-wiki-typing',
  templateUrl: './wiki-typing.component.html',
  styleUrls: ['./wiki-typing.component.less'],
  animations: [enterAnimation, leaveAnimation]
})
export class WikiTypingComponent implements OnDestroy {
  @ViewChild('inputRef') inputRef!: ElementRef;

  authenticationDialogRef: MatDialogRef<AuthenticationComponent> | undefined;

  isLoading: boolean = false;
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');

  randomActivated: boolean = false;
  inputFocused: boolean = false;
  wikiInput: string = '';

  textData: ITextData = {
    type: TypingType.WIKI
  };
  session: Signal<TypingSession> = this.sessionInfo.session;

  constructor(private readonly wikiService: WikiService,
              private readonly sessionInfo: SessionService,
              private readonly userInfo: UserInfo,
              private readonly dialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this.sessionInfo.resetSession();
  }

  @HostListener('document:keydown.ArrowLeft')
  random(): void {
    if (this.isRandomEnabled()) {
      this.updateWikiExtract('random');
    }
  }

  @HostListener('document:keydown.ArrowRight')
  drift(): void {
    if (this.isDriftEnabled()) {
      this.updateWikiExtract('drift');
    }
  }

  openAuthenticationDialog(isLogin: boolean): void {
    // TODO use isLogin
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    });
    this.authenticationDialogRef.afterClosed().subscribe(() => this.authenticationDialogRef = undefined);
  }

  updateWikiExtract(wikiMode: string): void {
    this.isLoading = true;
    switch (wikiMode) {
      case 'classic':
        this.wikiService.getWikiExtract(this.wikiInput, 'en').pipe(take(1)).subscribe(this.getWikiObserver());
        break;
      case 'random':
        this.wikiService.getRandomWikiExtract('en').pipe(take(1)).subscribe(this.getWikiObserver());
        break;
      case 'drift':
        this.wikiService.getDriftedWikiExtract(this.wikiInput, 'en').pipe(take(1)).subscribe(this.getWikiObserver());
        break;
    }
  }

  wikiExtracted(): boolean {
    return isDefined(this.textData?.text);
  }

  // extract: 'Error\n type ú Ê ê\'αβΦ\'ê and の, は, でした while you\'re here.';
  private getWikiObserver(): IWikiObserver {
    return {
      next: (wikiData: IWikiData) => this.setUpWikiData(wikiData),
      error: () => this.setUpWikiData({ title: '', extract: 'Very simple  \ntyはping.' })
    };
  }

  private setUpWikiData(wikiData: IWikiData): void {
    this.isLoading = false;
    this.wikiInput = wikiData.title ?? this.wikiInput;
    this.textData = {
      text: wikiData.extract,
      label: wikiData.title,
      type: TypingType.WIKI
    };
  }

  private isRandomEnabled(): boolean {
    return (!this.session().inProgress &&
      this.randomActivated &&
      isUndefined(this.authenticationDialogRef));
  }

  private isDriftEnabled(): boolean {
    return (!this.session().inProgress &&
      !this.inputFocused &&
      isUndefined(this.authenticationDialogRef));
  }
}

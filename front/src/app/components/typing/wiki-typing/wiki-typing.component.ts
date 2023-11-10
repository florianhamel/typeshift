import { Component, ElementRef, HostListener, Signal, ViewChild } from '@angular/core';
import { isDefined, isUndefined } from '../../../utils/checks';
import { WikiService } from '../../../services/typing/wiki.service';
import { AuthenticationComponent } from '../../common/authentication/authentication.component';
import { UserInfo } from '../../../services/user/user-info.service';
import { ITypingData } from '../typing-data/typing-data.component';
import { TypingSession } from '../../../models/classes/TypingSession';
import { TypingService } from '../../../services/typing/typing.service';
import { TypingType } from '../../../models/enums/TypingType';
import { ITypingSessionInfo, IWikiData } from '../../../models/interfaces/typing';
import { enterAnimation, leaveAnimation } from '../../../utils/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
export class WikiTypingComponent {
  @ViewChild('inputRef') inputRef!: ElementRef;

  authenticationDialogRef: MatDialogRef<AuthenticationComponent> | undefined;
  isLoading: boolean = false;
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  sessionClosed: boolean = true;
  wikiInput!: string;
  randomActivated: boolean = false;

  typingData: ITypingData = {
    wpm: NaN,
    accuracy: NaN,
    seconds: NaN
  };

  wikiData: IWikiData = {
    title: undefined,
    extract: undefined
  };

  constructor(private readonly wikiService: WikiService,
              private readonly typingService: TypingService,
              private readonly dialog: MatDialog,
              private readonly userInfo: UserInfo) {
  }

  @HostListener('document:keydown.enter')
  random(): void {
    if (this.sessionClosed && this.randomActivated && isUndefined(this.authenticationDialogRef)) {
      this.updateWikiExtract('random');
    }
  }

  @HostListener('document:keydown.escape')
  drift(): void {
    if (this.sessionClosed && isDefined(this.wikiData.title) && isUndefined(this.authenticationDialogRef)) {
      this.updateWikiExtract('drift');
    }
  }

  openAuthenticationDialog(isLogin: boolean): void {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    });
    console.log('hello');
    this.authenticationDialogRef.afterClosed().subscribe(() => this.authenticationDialogRef = undefined);
  }

  updateWikiExtract(wikiMode: string): void {
    this.isLoading = true;
    switch (wikiMode) {
      case 'classic':
        this.wikiService.getWikiExtract(this.wikiInput, 'en').subscribe(this.getWikiObserver());
        break;
      case 'random':
        this.wikiService.getRandomWikiExtract('en').subscribe(this.getWikiObserver());
        break;
      case 'drift':
        this.wikiService.getDriftedWikiExtract(this.wikiData.title!, 'en').subscribe(this.getWikiObserver());
        break;
    }
  }

  terminateSession(session: TypingSession): void {
    this.sessionClosed = true;
    this.userInfo.refreshStatus();
    const sessionInfo: ITypingSessionInfo = {
      type: TypingType.WIKI,
      label: this.wikiData.title
    };
    if (this.isAuthenticated()) {
      this.typingService.postSession(session, sessionInfo);
    } else {
      this.typingService.storeSession(session, sessionInfo);
    }
    setTimeout(() => {
      this.inputRef?.nativeElement.focus();
      this.inputRef?.nativeElement.select();
    });
  }

  wikiExtracted(): boolean {
    return isDefined(this.wikiData.extract);
  }

  updateTypingData(typingData: ITypingData): void {
    this.typingData = typingData;
  }

  updateRandomSwitch(): void {
    this.randomActivated = !this.randomActivated;
  }

  private getWikiObserver(): IWikiObserver {
    return {
      next: (wikiData: IWikiData) => this.setupWikiData(wikiData),
      error: () => {
        this.setupWikiData({
          title: '',
          extract: 'Very simple  \ntyはping.'
          // extract: 'Error\n type ú Ê ê\'αβΦ\'ê and の, は, でした while you\'re here.';
          // extract: 'Simple tyはははping. Lalalala type this fast éé aaaaa éé éééé éééé. Cats, enigmatic creatures, have fascinated humans for millennia. Cats have retractable claws, a stealthy adaptation for hunting. The world\'s oldest pet cat was discovered in a 9500-year-old grave.';
          // extract: 'Cats, enigmatic creatures, have fascinated humans for millennia. A cat\'s purr, a soothing vibration, is thought to have healing properties. Cats have retractable claws, a stealthy adaptation for hunting. The world\'s oldest pet cat was discovered in a 9500-year-old grave. Cats, natural acrobats, can jump up to six times their body length. They see better in low light, a nocturnal advantage. A group of cats is called a \'clowder.\' In ancient Egypt, cats were revered and even mummified. A cat\'s whiskers are highly sensitive, aiding in navigation. They communicate with subtle body language. Cats, independent yet affectionate, make wonderful companions. Fun, furry, and endlessly fascinating!';
        });
      }
    };
  }

  private setupWikiData(wikiData: IWikiData): void {
    this.isLoading = false;
    this.sessionClosed = false;
    this.wikiData.title = this.wikiInput = wikiData.title!;
    this.wikiData.extract = wikiData.extract;
  }
}

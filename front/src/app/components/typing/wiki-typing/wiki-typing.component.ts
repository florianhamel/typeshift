import { Component, ElementRef, Signal, ViewChild } from '@angular/core';
import { isDefined, isUndefined, nonNull } from '../../../utils/checks';
import { WikiService } from '../../../services/typing/wiki.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { AuthenticationComponent } from '../../common/log-in/authentication.component';
import { UserInfo } from '../../../services/user/user-info.service';
import { ITypingData } from '../typing-data/typing-data.component';
import { TypingSession } from '../../../models/classes/TypingSession';
import { TypingService } from '../../../services/typing/typing.service';
import { TypingType } from '../../../models/enums/TypingType';

export interface IWikiData {
  keyword: string;
  extract: string | undefined;
}

export interface ITypingSessionInfo {
  type: TypingType;
  label?: string;
}

@Component({
  selector: 'app-wiki-typing',
  templateUrl: './wiki-typing.component.html',
  styleUrls: ['./wiki-typing.component.less']
})
export class WikiTypingComponent {
  @ViewChild('inputRef') inputRef!: ElementRef;

  authenticationDialogRef!: DialogRef<unknown, AuthenticationComponent>;
  isLoading: boolean = false;
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  sessionClosed: boolean = false;
  sessionLabel!: string;

  typingData: ITypingData = {
    wpm: NaN,
    accuracy: NaN,
    seconds: NaN
  };

  wikiData: IWikiData = {
    keyword: '',
    extract: undefined
  };

  protected readonly isDefined = isDefined;

  constructor(private readonly wikiService: WikiService,
              private readonly typingService: TypingService,
              private readonly dialog: Dialog,
              private readonly userInfo: UserInfo) {
  }

  openAuthenticationDialog(isLogin: boolean): void {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    });
    const componentInstance: AuthenticationComponent | null = this.authenticationDialogRef.componentInstance;
    if (nonNull(componentInstance)) {
      componentInstance!.isLogIn = isLogin;
    }
  }

  protected readonly isUndefined = isUndefined;

  updateWikiExtract(): void {
    this.isLoading = true;
    this.wikiService.getWikiExtract(this.wikiData.keyword, 'en').subscribe({
      next: (wikiExtract: string): void => {
        this.sessionLabel = this.wikiData.keyword;
        this.sessionClosed = false;
        this.wikiData.extract = wikiExtract;
        this.isLoading = false;
      },
      error: (): void => {
        this.wikiData.extract = 'Simple tyはははping. Lalalala type this fast éé aaaaa éé éééé éééé. Cats, enigmatic creatures, have fascinated humans for millennia. Cats have retractable claws, a stealthy adaptation for hunting. The world\'s oldest pet cat was discovered in a 9500-year-old grave.';
        // this.wikiExtract = "Error\n type ú Ê ê\'αβΦ\'ê and の, は, でした while you\'re here.';
        // this.wikiExtract = 'Very simple  \nty は ping.';
        // this.wikiExtract = 'Cats, enigmatic creatures, have fascinated humans for millennia. A cat\'s purr, a soothing vibration, is thought to have healing properties. Cats have retractable claws, a stealthy adaptation for hunting. The world\'s oldest pet cat was discovered in a 9500-year-old grave. Cats, natural acrobats, can jump up to six times their body length. They see better in low light, a nocturnal advantage. A group of cats is called a \'clowder.\' In ancient Egypt, cats were revered and even mummified. A cat\'s whiskers are highly sensitive, aiding in navigation. They communicate with subtle body language. Cats, independent yet affectionate, make wonderful companions. Fun, furry, and endlessly fascinating!';
        this.isLoading = false;
      }
    });
  }

  terminateSession(session: TypingSession): void {
    this.sessionClosed = true;
    this.userInfo.refreshStatus();
    const sessionInfo: ITypingSessionInfo = {
      type: TypingType.WIKI,
      label: this.sessionLabel
    };
    if (this.isAuthenticated()) {
      this.typingService.postSession(session, sessionInfo);
    } else {
      this.typingService.storeSession(session, sessionInfo);
    }
    setTimeout(() => {
      this.inputRef.nativeElement.focus();
      this.inputRef.nativeElement.select();
    });
  }

  updateTypingData(typingData: ITypingData): void {
    this.typingData = typingData;
  }
}

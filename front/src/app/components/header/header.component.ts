import { Component, Signal } from '@angular/core';
import { UserInfo } from '../../services/user/user-info.service';
import { Dialog } from '@angular/cdk/dialog';
import { AuthenticationComponent } from '../common/log-in/authentication.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  username: Signal<string> = this.userInfo.get('username');

  constructor(private readonly userInfo: UserInfo,
              private readonly dialog: Dialog) {
  }

  logOut(): void {
    this.userInfo.clear();
  }

  openLogIn(): void {
    this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    });
  }
}

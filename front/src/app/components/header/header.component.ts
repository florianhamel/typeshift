import { Component, Signal } from '@angular/core';
import { UserInfo } from '../../services/user/user-info.service';
import { AuthenticationComponent } from '../common/authentication/authentication.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  authenticationDialogRef: MatDialogRef<AuthenticationComponent> | undefined;
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  username: Signal<string> = this.userInfo.get('username');
  areSettingsOpen: boolean = false;

  constructor(private readonly userInfo: UserInfo,
              private readonly dialog: MatDialog) {
  }

  logOut(): void {
    this.userInfo.clear();
    this.userInfo.refreshStatus();
  }

  openLogIn(): void {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop'
    });
    this.authenticationDialogRef.afterClosed().subscribe(() => this.authenticationDialogRef = undefined);
  }
}

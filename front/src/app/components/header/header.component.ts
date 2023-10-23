import { Component, Signal } from '@angular/core';
import { UserInfo } from '../../services/user/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  isAuthenticated: Signal<boolean> = this.userInfo.get('isAuthenticated');
  username: Signal<string> = this.userInfo.get('username');

  constructor(private readonly userInfo: UserInfo) {
  }
}

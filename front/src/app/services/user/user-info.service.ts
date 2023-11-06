import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IUserInfo } from '../../models/interfaces/user-information/IUserInfo';
import { LocalStorageService } from 'ngx-webstorage';
import { isDefined, nonNull } from '../../utils/checks';
import { IUserInfoSignals } from '../../models/interfaces/user-information/IUserInfoSignals';
import { TUserInfoKey } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class UserInfo {
  readonly userInfoKeys: TUserInfoKey[] = ['username', 'email', 'firstname', 'lastname', 'expiration'];
  userInfoSignals: IUserInfoSignals = {
    username: signal(this.localStorage.retrieve('username')),
    email: signal(this.localStorage.retrieve('email')),
    firstname: signal(this.localStorage.retrieve('firstname')),
    lastname: signal(this.localStorage.retrieve('lastname')),
    expiration: signal(this.localStorage.retrieve('expiration')),
    isAuthenticated: signal(this.isTokenValid())
  };

  constructor(private readonly localStorage: LocalStorageService) {
    this.observe();
  }

  get(key: TUserInfoKey | 'isAuthenticated'): Signal<any> {
    return this.userInfoSignals[key];
  }

  store(userInfo: IUserInfo): void {
    this.userInfoKeys.forEach(key => {
      this.localStorage.store(key, userInfo[key]);
    });
    this.refreshStatus();
  }

  clear(key?: TUserInfoKey): void {
    if (isDefined(key)) {
      this.localStorage.clear(key);
    } else {
      this.userInfoKeys.forEach(key => {
        this.localStorage.clear(key);
      });
    }
  }

  refreshStatus() {
    this.userInfoSignals.isAuthenticated.set(this.isTokenValid());
  }

  private observe(): void {
    this.userInfoKeys.forEach(key => {
      this.localStorage.observe(key).subscribe({
        next: (value: string | number) => (this.userInfoSignals[key] as WritableSignal<string | number>).set(value)
      });
    });
  }

  private isTokenValid(): boolean {
    const expiration: number = this.localStorage.retrieve('expiration');
    return (nonNull(expiration) && (new Date() < new Date(expiration)));
  }
}

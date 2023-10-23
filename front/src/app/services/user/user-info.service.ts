import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IUserInfo } from '../../models/IUserInfo';
import { LocalStorageService } from 'ngx-webstorage';
import { isDefined, nonNull } from '../../utils/checks';

type TUserInfoKey = 'username' | 'email' | 'firstname' | 'lastname' | 'expiration';

interface IUserInfoSignals {
  username: WritableSignal<string>;
  email: WritableSignal<string>;
  firstname: WritableSignal<string>;
  lastname: WritableSignal<string>;
  expiration: WritableSignal<number>;
  isAuthenticated: Signal<boolean>;
}

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
    isAuthenticated: computed(() => nonNull(this.userInfoSignals.expiration()) && this.isTokenValid())
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

  private observe(): void {
    this.userInfoKeys.forEach(key => {
      this.localStorage.observe(key).subscribe({
        next: (value: string | number) => (this.userInfoSignals[key] as WritableSignal<string | number>).set(value)
      });
    });
  }

  private isTokenValid(): boolean {
    return (new Date() < new Date(this.localStorage.retrieve('expiration')));
  }
}

import { WritableSignal } from '@angular/core';

export interface IUserInfoSignals {
  username: WritableSignal<string>;
  email: WritableSignal<string>;
  firstname: WritableSignal<string>;
  lastname: WritableSignal<string>;
  expiration: WritableSignal<number>;
  isAuthenticated: WritableSignal<boolean>;
}

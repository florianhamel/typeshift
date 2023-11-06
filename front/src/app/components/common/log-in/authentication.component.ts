import { Component, Input } from '@angular/core';
import {
  AuthenticationService,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN
} from '../../../services/authentication/authentication.service';
import { UserInfo } from '../../../services/user/user-info.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { TypingService } from '../../../services/typing/typing.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less'],
  animations: [
    trigger('validationError', [
      state('invisible', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('invisible <=> visible', [animate('150ms')])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class AuthenticationComponent {
  @Input() isLogIn: boolean = true;

  logInForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(USERNAME_MIN),
      Validators.maxLength(USERNAME_MAX)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(PASSWORD_MIN)
    ])
  });

  constructor(private readonly authService: AuthenticationService,
              private readonly userInfo: UserInfo,
              private readonly typingService: TypingService,
              private readonly dialogRef: DialogRef) {
  }

  logIn(): void {
    this.authService.logIn(this.logInForm).subscribe({
      next: userInfo => {
        this.userInfo.store(userInfo);
        this.typingService.postStoredSessions();
        this.dialogRef.close();
      },
      error: (response: HttpErrorResponse) => this.authService.setBadCredentials(this.logInForm, response)
    });
  }

  signUp(): void {
    this.authService.signUp(this.signUpForm).subscribe({
      next: () => this.isLogIn = true,
      error: (response: HttpErrorResponse) => this.authService.setError(this.signUpForm, response)
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  changeModal(): void {
    this.isLogIn = !this.isLogIn;
  }

  hasError(control: string): boolean {
    return this.authService.hasError(this.signUpForm, control);
  }

  isValid(control: string): boolean {
    return this.authService.isValid(this.signUpForm, control);
  }

  getError(control: string): string {
    return this.authService.getError(this.signUpForm, control);
  }

  getConfig(control: string): string {
    return this.authService.getConfig(control);
  }

  hasBadCredentials(logInForm: FormGroup): boolean {
    return this.authService.hasBadCredentials(logInForm);
  }
}

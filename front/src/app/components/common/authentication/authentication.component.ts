import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  AuthenticationService,
  PASSWORD_MIN,
  USERNAME_MAX,
  USERNAME_MIN
} from '../../../services/authentication/authentication.service';
import { UserInfo } from '../../../services/user/user-info.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TypingService } from '../../../services/typing/typing.service';
import { enterAnimation, visibilityAnimation } from '../../../utils/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule
  ],
  animations: [visibilityAnimation, enterAnimation]
})

export class AuthenticationComponent {
  @Input() isLogIn: boolean = true;

  @ViewChild('logInUsernameRef') logInUsernameRef!: ElementRef;

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

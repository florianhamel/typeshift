import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { isDefined, isNull, isUndefined, nonNull } from '../../utils/checks';


export const USERNAME_MIN: number = 3;
export const USERNAME_MAX: number = 16;
export const PASSWORD_MIN: number = 7;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticationUrl: string = environment.apiUrl + '/auth';

  private readonly translateKeyBase: string = 'validator.error.';
  private readonly configs: Map<string, any> = new Map([
    ['email', { key: 'Email' }],
    ['username', { key: 'Username', minlength: USERNAME_MIN, maxlength: USERNAME_MAX }],
    ['password', { key: 'Password', minlength: PASSWORD_MIN }]
  ]);

  constructor(private readonly http: HttpClient) {
  }

  logIn(logInForm: FormGroup): Observable<any> {
    return this.http.post(this.authenticationUrl + '/log-in', {
      username: logInForm.value.username,
      password: logInForm.value.password
    }, { withCredentials: true });
  }

  signUp(signUpForm: FormGroup): Observable<any> {
    return this.http.post(this.authenticationUrl + '/sign-up', {
      email: signUpForm.value.email,
      username: signUpForm.value.username,
      password: signUpForm.value.password
    });
  }

  setBadCredentials(logInForm: FormGroup, response: HttpErrorResponse): void {
    if (response.status === HttpStatusCode.Unauthorized) {
      logInForm.get('password')!.setErrors({ badCredentials: true });
    }
  }

  hasBadCredentials(form: FormGroup): boolean {
    const errors: ValidationErrors | null = form.get('password')!.errors;
    return nonNull(errors) ? Object.keys(errors!).includes('badCredentials') : false;
  }

  hasError(form: FormGroup, control: string): boolean {
    const abstractControl: AbstractControl<any, any> = form.get(control)!;
    return (!!abstractControl.errors && abstractControl.touched);
  }

  isValid(form: FormGroup, control: string): boolean {
    const abstractControl: AbstractControl<any, any> = form.get(control)!;
    return (!abstractControl.errors && abstractControl.dirty);
  }

  getError(form: FormGroup, control: string): string {
    const errors: ValidationErrors | undefined | null = form.get(control)?.errors;
    if (isUndefined(errors) || isNull(errors)) {
      return '';
    }
    return this.translateKeyBase + Object.keys(form.get(control)!.errors!)[0];
  }

  getConfig(control: string): any {
    return this.configs.get(control);
  }

  setError(signUpForm: FormGroup, response: HttpErrorResponse): void {
    if (response.status === HttpStatusCode.NotAcceptable && isDefined(response.error?.detail)) {
      switch (response.error.detail) {
        case 'EMAIL_ALREADY_EXISTS':
          signUpForm.get('email')!.setErrors({ emailAlreadyExists: true });
          break;
        case 'USERNAME_ALREADY_EXISTS':
          signUpForm.get('username')!.setErrors({ usernameAlreadyExists: true });
          break;
      }
    }
  }
}

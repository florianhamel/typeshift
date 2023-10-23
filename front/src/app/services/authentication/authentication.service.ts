import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authenticationUrl: string = environment.apiUrl + '/auth';

  constructor(private readonly http: HttpClient) {
  }

  login(loginForm: FormGroup): Observable<any> {
    let options = { withCredentials: true };
    return this.http.post(this.authenticationUrl + '/login', {
      username: loginForm.value.username,
      password: loginForm.value.password
    }, options);
  }
}

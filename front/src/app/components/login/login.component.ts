import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserInfo } from '../../services/user/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly authenticationService: AuthenticationService,
              private readonly userService: UserInfo,
              private readonly router: Router) {
  }

  login(): void {
    this.authenticationService.login(this.loginForm).subscribe({
      next: value => {
        this.userService.store(value);
        this.router.navigate(['/wiki-typing']).then();
      },
      error: err => console.log(err)
    });
  }

  testMethod() {
  }
}

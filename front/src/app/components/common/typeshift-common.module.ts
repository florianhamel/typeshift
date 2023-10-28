import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { AuthenticationComponent } from './log-in/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorComponent } from './validation-error/validation-error.component';

@NgModule({
  declarations: [
    LoadingComponent,
    AuthenticationComponent,
    ValidationErrorComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    TranslateModule
  ],
  exports: [
    LoadingComponent,
    AuthenticationComponent
  ]
})
export class TypeshiftCommonModule {
}

import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { SwitchComponent } from './switch/switch.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoadingComponent,
    ValidationErrorComponent,
    SwitchComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    TranslateModule
  ],
  exports: [
    LoadingComponent,
    SwitchComponent
  ]
})
export class TypeshiftCommonModule {
}

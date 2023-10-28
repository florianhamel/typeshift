import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.less']
})
export class ValidationErrorComponent {
  @Input() form!: FormGroup;
  @Input() control!: string;

  constructor() {
  }
}

import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isNull, isUndefined } from '../../utils/checks';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  translateKeyBase: string = 'validator.error.';

  configs: Map<string, any> = new Map([
    ['email', null],
    ['username', { key: 'username', minLength: 3, maxLength: 16 }]
  ]);

  isValid(form: FormGroup, control: string): boolean {
    const abstractControl: AbstractControl<any, any> = form.get(control)!;
    return (!abstractControl.errors && abstractControl.dirty);
  }

  getError(form: FormGroup, control: string): string {
    const abstractControl: ValidationErrors | undefined | null = form.get(control)?.errors;
    if (isUndefined(abstractControl) || isNull(abstractControl)) {
      return 'Error';
    }
    return this.translateKeyBase + Object.keys(form.get(control)!.errors!)[0];
  }

  getConfig(control: string): any {
    return this.configs.get(control);
  }
}

import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsInternationalService } from '../../services/typing/keyboard-layouts/us-international.service';
import { IKeyboardLayout } from '../../services/typing/keyboard-layouts/IKeyboardLayout';
import { TypingDataComponent } from './typing-data/typing-data.component';
import { CommonModule } from '@angular/common';
import { TypingInterfaceComponent } from './typing-interface/typing-interface.component';
import { TypingComponent } from './typing/typing.component';
import { FormsModule } from '@angular/forms';
import { TypeshiftCommonModule } from '../common/typeshift-common.module';
import { DialogModule } from '@angular/cdk/dialog';

export const KEYBOARD_LAYOUT_TOKEN: InjectionToken<IKeyboardLayout> =
  new InjectionToken<IKeyboardLayout>('keyboardLayoutToken');

@NgModule({
  declarations: [
    TypingComponent,
    TypingInterfaceComponent,
    TypingDataComponent
  ],
  exports: [
    TypingComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    TypeshiftCommonModule,
    DialogModule
  ],
  providers: [
    {
      provide: KEYBOARD_LAYOUT_TOKEN,
      useFactory: (keyboard: UsInternationalService): IKeyboardLayout => keyboard,
      deps: [UsInternationalService]
    }
  ]
})
export class TypingModule {
}

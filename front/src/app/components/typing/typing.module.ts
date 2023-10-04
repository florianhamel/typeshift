import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingComponent } from './typing/typing.component';
import { TypingInterfaceComponent } from './typing-interface/typing-interface.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsInternationalService } from '../../services/typing/keyboard-layouts/us-international.service';
import { IKeyboardLayout } from '../../services/typing/keyboard-layouts/IKeyboardLayout';
import { TypingDataComponent } from './typing-data/typing-data.component';

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
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: KEYBOARD_LAYOUT_TOKEN,
      useFactory: (keyboard: UsInternationalService): IKeyboardLayout => keyboard,
      deps: [UsInternationalService]
    },
  ]
})
export class TypingModule {
}

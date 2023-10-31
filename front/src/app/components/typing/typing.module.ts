import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsInternationalLayout } from '../../services/typing/keyboard-layouts/us-international-layout.service';
import { IKeyboardLayout } from '../../services/typing/keyboard-layouts/IKeyboardLayout';
import { TypingDataComponent } from './typing-data/typing-data.component';
import { CommonModule } from '@angular/common';
import { WikiTypingComponent } from './wiki-typing/wiki-typing.component';
import { FormsModule } from '@angular/forms';
import { TypeshiftCommonModule } from '../common/typeshift-common.module';
import { DialogModule } from '@angular/cdk/dialog';
import { TypingSessionComponent } from './typing-session/typing-session.component';

export const KEYBOARD_LAYOUT_TOKEN: InjectionToken<IKeyboardLayout> =
  new InjectionToken<IKeyboardLayout>('keyboardLayoutToken');

@NgModule({
  declarations: [
    WikiTypingComponent,
    TypingDataComponent,
    TypingSessionComponent
  ],
  exports: [],
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
      useFactory: (keyboard: UsInternationalLayout): IKeyboardLayout => keyboard,
      deps: [UsInternationalLayout]
    }
  ]
})
export class TypingModule {
}

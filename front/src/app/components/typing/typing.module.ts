import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsInternationalLayout } from '../../services/typing/keyboard-layouts/us-international-layout.service';
import { IKeyboardLayout } from '../../services/typing/keyboard-layouts/IKeyboardLayout';
import { TypingDataComponent } from './typing-data/typing-data.component';
import { CommonModule } from '@angular/common';
import { WikiTypingComponent } from './wiki-typing/wiki-typing.component';
import { FormsModule } from '@angular/forms';
import { TypeshiftCommonModule } from '../common/typeshift-common.module';
import { TypingSessionComponent } from './typing-session/typing-session.component';
import { AiTypingComponent } from './ai-typing/ai-typing.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

export const KEYBOARD_LAYOUT_TOKEN: InjectionToken<IKeyboardLayout> =
  new InjectionToken<IKeyboardLayout>('keyboardLayoutToken');

@NgModule({
  declarations: [
    WikiTypingComponent,
    TypingDataComponent,
    TypingSessionComponent,
    AiTypingComponent
  ],
  exports: [],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    TypeshiftCommonModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatSlideToggleModule
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

import { InjectionToken, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsInternationalLayout } from '../../services/typing/keyboard-layouts/us-international-layout.service';
import { TypingDataComponent } from './typing-data/typing-data.component';
import { CommonModule } from '@angular/common';
import { WikiTypingComponent } from './wiki-typing/wiki-typing.component';
import { FormsModule } from '@angular/forms';
import { TypeshiftCommonModule } from '../common/typeshift-common.module';
import { TextSessionComponent } from './text-session/text-session.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { AbstractLayoutService } from '../../services/typing/keyboard-layouts/abstract-layout.service';

export const KEYBOARD_LAYOUT_TOKEN: InjectionToken<AbstractLayoutService> =
  new InjectionToken<AbstractLayoutService>('keyboardLayoutToken');

@NgModule({
  declarations: [
    WikiTypingComponent,
    TypingDataComponent,
    TextSessionComponent
  ],
  exports: [
    TypingDataComponent
  ],
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
      useFactory: (keyboard: UsInternationalLayout): AbstractLayoutService => keyboard,
      deps: [UsInternationalLayout]
    }
  ]
})
export class TypingModule {
}

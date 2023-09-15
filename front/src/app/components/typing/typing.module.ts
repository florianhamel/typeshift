import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingComponent } from './typing/typing.component';
import { TypingInterfaceComponent } from './typing-interface/typing-interface.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TypingComponent,
    TypingInterfaceComponent
  ],
  exports: [
    TypingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TypingModule { }

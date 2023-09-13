import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypingComponent } from './components/typing/typing.component';
import { PromptComponent } from './components/typing/prompt/prompt.component';

@NgModule({
  declarations: [
    AppComponent,
    TypingComponent,
    PromptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

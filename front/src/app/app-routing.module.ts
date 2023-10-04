import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingComponent } from './components/typing/typing/typing.component';

const routes: Routes = [
  { title: 'home', path: '', component: TypingComponent },
  { title: 'wiki extract', path: 'wiki-extract', component: TypingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

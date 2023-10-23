import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingComponent } from './components/typing/typing/typing.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { title: 'home', path: '', component: TypingComponent },
  { title: 'wiki typing', path: 'wiki-typing', component: TypingComponent },
  { title: 'login', path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypingComponent } from './components/typing/typing/typing.component';
import { AuthenticationComponent } from './components/common/log-in/authentication.component';

const routes: Routes = [
  { title: 'home', path: '', component: TypingComponent },
  { title: 'wiki typing', path: 'wiki-typing', component: TypingComponent },
  { title: 'login', path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

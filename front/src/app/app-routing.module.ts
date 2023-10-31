import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/common/log-in/authentication.component';
import { WikiTypingComponent } from './components/typing/wiki-typing/wiki-typing.component';

const routes: Routes = [
  { title: 'home', path: '', component: WikiTypingComponent },
  { title: 'wiki typing', path: 'wiki-typing', component: WikiTypingComponent },
  { title: 'login', path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

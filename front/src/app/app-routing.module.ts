import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/common/authentication/authentication.component';
import { WikiTypingComponent } from './components/typing/wiki-typing/wiki-typing.component';
import { AiTypingComponent } from './components/typing/ai-typing/ai-typing.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { title: 'home', path: '', component: HomeComponent },
  { title: 'wiki typing', path: 'wiki-typing', component: WikiTypingComponent },
  { title: 'ai typing', path: 'ai-typing', component: AiTypingComponent },
  { title: 'login', path: 'login', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

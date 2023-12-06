import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/common/authentication/authentication.component';
import { WikiTypingComponent } from './components/typing/wiki-typing/wiki-typing.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'wiki-typing', component: WikiTypingComponent },
  { path: 'course', loadChildren: () => import('./components/course/course.module').then(m => m.CourseModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

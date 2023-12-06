import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { HandsComponent } from './hands/hands.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { CourseComponent } from './course.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { TypingModule } from '../typing/typing.module';


@NgModule({
  declarations: [
    CourseComponent,
    ExerciseComponent,
    KeyboardComponent,
    HandsComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    TypingModule
  ]
})
export class CourseModule {
}

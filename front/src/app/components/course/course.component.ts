import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/typing/course/exercise.service';

export type TLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface IExercise {
  id: number;
  characters: string;
  level: TLevel;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.less']
})
export class CourseComponent implements OnInit {
  exercises: IExercise[] | undefined;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.exerciseService.getAll().subscribe({
      next: exercises => this.exercises = exercises
    });
  }

  startExercise(exercise: IExercise): void {
    this.router.navigate(['/course/exercise/', exercise.id]).then();
  }

  trackExercise(index: number, exercise: IExercise): number {
    return exercise.id;
  }
}

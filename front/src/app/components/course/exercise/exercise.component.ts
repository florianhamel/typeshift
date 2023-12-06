import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Signal,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypingSession } from '../../../models/classes/TypingSession';
import { IExercise } from '../course.component';
import { ExerciseSessionService } from '../../../services/typing/session/exercise-session.service';
import { ExerciseService } from '../../../services/typing/course/exercise.service';
import { SessionService } from '../../../services/typing/session/session.service';

// TODO implement abstract SessionComponent??
@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.less']
})
export class ExerciseComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() sessionClosed: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('sessionContainerRef') sessionContainerRef!: ElementRef;

  exercise!: IExercise;
  session: Signal<TypingSession> = this.sessionServiceTmp.session;

  constructor(private readonly sessionService: SessionService,
              private readonly sessionServiceTmp: ExerciseSessionService,
              private readonly exerciseService: ExerciseService,
              private readonly route: ActivatedRoute) {
  }

  keyPressed(event: KeyboardEvent): void {
    this.sessionServiceTmp.processKeyPressed(event);
    if (this.session().closed) {
      this.sessionClosed.emit();
    }
  }

  ngOnInit(): void {
    const exerciseId: number = this.route.snapshot.params['exerciseId'];
    this.exerciseService.getById(exerciseId).subscribe({
      next: exercise => {
        this.exercise = exercise;
        this.sessionServiceTmp.setUpSession(this.buildRandomText(this.exercise));
      },
      error: () => {
        this.exercise = {
          id: 0,
          characters: 'asdfghjkl',
          level: 'INTERMEDIATE'
        };
        this.sessionServiceTmp.setUpSession(this.buildRandomText(this.exercise));
      }
    });
  }

  ngAfterViewInit(): void {
    this.sessionContainerRef.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.sessionService.resetSession();
  }

  private buildRandomText(exercise: IExercise): string {
    const characters: string = exercise!.characters + ' ';
    let randomText: string = '';
    for (let i = 0; i < 50; i++) {
      randomText += characters.at(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomText;
  }
}

import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { IExercise } from '../../../components/course/course.component';
import { isDefined } from '../../../utils/checks';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly exerciseUrl: string = environment.apiUrl + '/exercise';

  private _exercises: IExercise[] | undefined;

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<IExercise[]> {
    return isDefined(this._exercises) ?
      of(this._exercises!) :
      this.http.get<IExercise[]>(this.exerciseUrl).pipe(
        tap(exercises => this._exercises = exercises)
      );
  }

  getById(exerciseId: number): Observable<IExercise> {
    return this.http.get<IExercise>(this.exerciseUrl + '/' + exerciseId);
  }
}

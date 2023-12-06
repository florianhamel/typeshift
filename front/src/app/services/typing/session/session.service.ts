import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TypingSession } from '../../../models/classes/TypingSession';
import { ITypingData } from '../../../models/interfaces/typing';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _session: WritableSignal<TypingSession> = signal<TypingSession>(new TypingSession());
  private _typingData$: Subject<ITypingData> = new Subject<ITypingData>();

  get session(): Signal<TypingSession> {
    return this._session;
  }

  get typingData$(): Observable<ITypingData> {
    return this._typingData$.asObservable();
  }

  resetSession(): void {
    clearInterval(this._session().intervalId);
    this._session.set(new TypingSession());
  }

  nextTypingData(): void {
    this._typingData$.next({
      wpm: this._session().wpm,
      accuracy: this._session().accuracy,
      seconds: this._session().seconds
    });
  }
}

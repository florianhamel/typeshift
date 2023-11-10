import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypingSession } from '../../models/classes/TypingSession';
import { environment } from '../../../environments/environment.development';
import { SessionStorageService } from 'ngx-webstorage';
import { isNull, nonNull } from '../../utils/checks';
import { TypingType } from '../../models/enums/TypingType';
import { ITypingSessionInfo } from '../../models/interfaces/typing';

export interface ITypingSessionDTO {
  wpm: number;
  accuracy: number;
  type: TypingType;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TypingService {
  private readonly typingUrl: string = environment.apiUrl + '/typing';

  constructor(private readonly http: HttpClient,
              private readonly sessionStorage: SessionStorageService) {
  }

  postSession(session: TypingSession, sessionInfo: ITypingSessionInfo): void {
    this.http.post(this.typingUrl + '/session', {
      wpm: session.wpm,
      accuracy: session.accuracy,
      type: sessionInfo.type,
      label: sessionInfo.label
    } as ITypingSessionDTO, { withCredentials: true }).subscribe({
      error: () => this.storeSession(session, sessionInfo)
    });
  }

  postStoredSessions(): void {
    const storedSessionsDTOs: ITypingSessionDTO[] = this.sessionStorage.retrieve('sessions');
    if (nonNull(storedSessionsDTOs)) {
      this.http.post(this.typingUrl + '/sessions', storedSessionsDTOs,
        { withCredentials: true }).subscribe({
        complete: () => this.sessionStorage.clear('sessions')
      });
    }
  }

  storeSession(session: TypingSession, sessionInfo: ITypingSessionInfo): void {
    const storedSessionDTOs: ITypingSessionDTO[] = this.sessionStorage.retrieve('sessions');
    const sessionDTO: ITypingSessionDTO = {
      wpm: session.wpm,
      accuracy: session.accuracy,
      type: sessionInfo.type,
      label: sessionInfo.label
    };
    if (isNull(storedSessionDTOs)) {
      this.sessionStorage.store('sessions', [sessionDTO]);
    } else {
      storedSessionDTOs.push(sessionDTO);
      this.sessionStorage.store('sessions', storedSessionDTOs);
    }
  }
}

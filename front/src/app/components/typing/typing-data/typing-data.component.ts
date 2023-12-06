import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITypingData } from '../../../models/interfaces/typing';
import { SessionService } from '../../../services/typing/session/session.service';

@Component({
  selector: 'app-typing-data',
  templateUrl: './typing-data.component.html',
  styleUrls: ['./typing-data.component.less']
})
export class TypingDataComponent {
  typingData: ITypingData = {
    wpm: NaN,
    accuracy: NaN,
    seconds: NaN
  };

  constructor(private readonly sessionInfo: SessionService) {
    this.sessionInfo.typingData$.pipe(takeUntilDestroyed()).subscribe({
      next: (typingData: ITypingData) => this.typingData = typingData
    });
  }

  formatWpm(): string {
    return (isNaN(this.typingData.wpm) || this.typingData.wpm < 5) ? 'N/A' : this.typingData.wpm.toFixed() + ' wpm';
  }

  formatAccuracy(): string {
    return isNaN(this.typingData.accuracy) ? 'N/A' : this.typingData.accuracy.toFixed(1) + '%';
  }

  formatTime(): string {
    return isNaN(this.typingData.seconds) ? 'N/A' : this.typingData.seconds.toFixed(0) + 's';
  }
}

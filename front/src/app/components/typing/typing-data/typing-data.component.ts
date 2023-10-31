import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ITypingData {
  wpm: number;
  accuracy: number;
  seconds: number;
}

@Component({
  selector: 'app-typing-data',
  templateUrl: './typing-data.component.html',
  styleUrls: ['./typing-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingDataComponent {
  @Input() typingData!: ITypingData;

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

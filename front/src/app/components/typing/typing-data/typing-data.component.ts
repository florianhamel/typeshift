import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-data',
  templateUrl: './typing-data.component.html',
  styleUrls: ['./typing-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypingDataComponent {
  @Input() wpm: number = NaN;
  @Input() accuracy: number = NaN;
  @Input() seconds: number = NaN;

  formatWpm(): string {
    return (isNaN(this.wpm) || this.wpm < 5) ? 'N/A' : this.wpm.toFixed() + ' wpm';
  }

  formatAccuracy(): string {
    return isNaN(this.accuracy) ? 'N/A' : this.accuracy.toFixed(1) + '%';
  }

  formatTime(): string {
    return isNaN(this.seconds) ? 'N/A' : this.seconds.toFixed(0) + 's';
  }
}

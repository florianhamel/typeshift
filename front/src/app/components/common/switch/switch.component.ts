import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.less']
})
export class SwitchComponent {
  @Input() blurAfter: boolean = false;
  @Output() switched: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('switchRef') switchRef!: ElementRef;

  switch(): void {
    if (this.blurAfter) {
      this.switchRef.nativeElement.blur();
    }
    this.switched.emit();
  }
}

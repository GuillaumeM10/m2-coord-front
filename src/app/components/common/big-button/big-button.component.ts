import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-big-button',
  imports: [],
  templateUrl: './big-button.component.html',
  styleUrl: './big-button.component.scss',
})
export class BigButtonComponent {
  // Inputs and Outputs
  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;

  @Output() clickEmitter = new EventEmitter<MouseEvent>();

  // Protected Methods
  protected onClickButton(event: MouseEvent): void {
    this.clickEmitter.emit(event);
  }
}

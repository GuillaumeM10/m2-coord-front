import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-small-button',
  imports: [],
  templateUrl: './small-button.component.html',
  styleUrl: './small-button.component.scss',
})
export class SmallButtonComponent {
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

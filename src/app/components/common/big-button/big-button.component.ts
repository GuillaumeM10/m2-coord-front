import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-big-button',
  imports: [],
  templateUrl: './big-button.component.html',
  styleUrl: './big-button.component.scss'
})
export class BigButtonComponent {
  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}

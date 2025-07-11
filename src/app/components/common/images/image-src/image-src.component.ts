import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-src',
  imports: [NgOptimizedImage],
  templateUrl: './image-src.component.html',
  styleUrl: './image-src.component.css',
})
export class ImageSrcComponent {
  private _src!: string;
  private readonly imagesFolder: string = '/images';
  public readonly loading: 'lazy' | 'eager' | 'auto' | undefined = 'lazy';

  @Input() public alt: string = 'default alternative text';
  @Input() public height: number = 100;
  @Input() public width: number = 100;

  @Input()
  public set src(value: string) {
    if (value.includes(this.imagesFolder)) {
      this._src = value;
    } else if (value[0] === '/') {
      this._src = this.imagesFolder + value;
    } else {
      this._src = this.imagesFolder + '/' + value;
    }
  }

  public get src(): string {
    return this._src;
  }
}

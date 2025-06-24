import { Component, Input } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-image-src',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './image-src.component.html',
  styleUrl: './image-src.component.css'
})
export class ImageSrcComponent {
  private _src!: string;
  private imagesFolder: string = '/images';
  public loading: "lazy" | "eager" | "auto" | undefined = "lazy";

  @Input() public alt!: string;
  @Input() public height: number = 100;
  @Input() public width: number = 100;

  @Input()
  public set src(value: string) {
    if (value[0] === '/') {
      this._src = this.imagesFolder + value;
    } else {
      this._src = this.imagesFolder + '/' + value;
    }
  }

  public get src(): string {
    return this._src;
  }
}

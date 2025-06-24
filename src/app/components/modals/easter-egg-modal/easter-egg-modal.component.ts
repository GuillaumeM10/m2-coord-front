import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { EasterEggModalData } from '@app/components/modals/easter-egg-modal/easter-egg-modal-data.type';
import {ImageSrcComponent} from '@app/components/common/images/image-src/image-src.component';

@Component({
  selector: 'app-easter-egg-modal',
  imports: [MatDialogTitle, MatDialogContent, ImageSrcComponent],
  templateUrl: './easter-egg-modal.component.html',
  styleUrl: './easter-egg-modal.component.css',
})
export class EasterEggModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: EasterEggModalData) {}
}

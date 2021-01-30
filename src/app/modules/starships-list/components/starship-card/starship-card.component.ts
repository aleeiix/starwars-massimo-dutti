import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { environment } from 'src/environments/environment';

import { Starship } from '@models/starship.interface';

@Component({
  selector: 'md-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipCardComponent {
  @Input() starship: Starship;

  error = false;

  get imageStyle(): { 'background-image': string } {
    if (this.error) {
      return { 'background-image': `url(${environment.image_not_found})` };
    } else {
      return { 'background-image': `url(${this.starship.image})` };
    }
  }

  constructor() {}

  showImageNotFound(): void {
    this.error = true;
  }
}

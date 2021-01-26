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
export class StarshipCardComponent implements OnInit {
  @Input() starship: Starship;

  constructor() {}

  ngOnInit(): void {}

  showImageNotFound(event: { target: { src: string } }): void {
    event.target.src = environment.image_not_found;
  }
}

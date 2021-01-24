import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

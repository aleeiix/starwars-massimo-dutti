import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

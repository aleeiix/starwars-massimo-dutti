import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoggedLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

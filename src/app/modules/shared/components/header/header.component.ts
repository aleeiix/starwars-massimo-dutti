import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'md-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  logoutEmit(): void {
    this.logout.emit();
  }
}

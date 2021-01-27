import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'md-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() isAdmin: boolean;
  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor() {}

  logoutEmit(): void {
    this.logout.emit();
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.routes = [
      {
        link: '/starships',
        text: 'NAVES',
        isVisible: true
      },
      {
        link: '/extra',
        text: 'EXTRA',
        isVisible: true
      },
      {
        link: '/admin',
        text: 'ADMINISTRACIÓN',
        isVisible: false
      }
    ];

    component.sideNavIsOpen = false;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggleSideNavEmit emit', () => {
    spyOn(component.toggleSideNav, 'emit');

    component.toggleSideNavEmit();

    expect(component.toggleSideNav.emit).toHaveBeenCalled();
  });

  it('should logoutEmit emit', () => {
    spyOn(component.logout, 'emit');

    component.logoutEmit();

    expect(component.logout.emit).toHaveBeenCalled();
  });
});

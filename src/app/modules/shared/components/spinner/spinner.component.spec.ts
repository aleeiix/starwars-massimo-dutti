import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should isLoading true', () => {
    const service = TestBed.inject(SpinnerService);

    service.openLoading();

    expect(component.isLoading).toBeTrue();
  });

  it('should isLoading false', () => {
    const service = TestBed.inject(SpinnerService);

    service.closeLoading();

    expect(component.isLoading).toBeFalse();
  });
});

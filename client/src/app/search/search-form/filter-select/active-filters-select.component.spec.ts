import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveFiltersSelectComponent } from './active-filters-select.component';

describe('ActiveFiltersSelectComponent', () => {
  let component: ActiveFiltersSelectComponent;
  let fixture: ComponentFixture<ActiveFiltersSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveFiltersSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFiltersSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

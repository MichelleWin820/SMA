import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableColumnsSelectComponent } from './table-columns-select.component';

describe('TableColumnsSelectComponent', () => {
  let component: TableColumnsSelectComponent;
  let fixture: ComponentFixture<TableColumnsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableColumnsSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

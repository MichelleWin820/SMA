import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportPapersComponent } from './import-papers.component';

describe('ImportPapersComponent', () => {
  let component: ImportPapersComponent;
  let fixture: ComponentFixture<ImportPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportPapersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

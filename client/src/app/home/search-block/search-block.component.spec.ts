import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSearchBlockComponent } from './search-block.component';

describe('HomeSearchBlockComponent', () => {
  let component: HomeSearchBlockComponent;
  let fixture: ComponentFixture<HomeSearchBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSearchBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSearchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedDashboardComponent } from './shed-dashboard.component';

describe('ShedDashboardComponent', () => {
  let component: ShedDashboardComponent;
  let fixture: ComponentFixture<ShedDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

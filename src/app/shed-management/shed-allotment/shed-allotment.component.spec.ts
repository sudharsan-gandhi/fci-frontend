import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedAllotmentComponent } from './shed-allotment.component';

describe('ShedAllotmentComponent', () => {
  let component: ShedAllotmentComponent;
  let fixture: ComponentFixture<ShedAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShedAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

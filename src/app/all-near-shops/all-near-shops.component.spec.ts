import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNearShopsComponent } from './all-near-shops.component';

describe('AllNearShopsComponent', () => {
  let component: AllNearShopsComponent;
  let fixture: ComponentFixture<AllNearShopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNearShopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNearShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

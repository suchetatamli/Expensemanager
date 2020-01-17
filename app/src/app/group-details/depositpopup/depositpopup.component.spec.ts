import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositpopupComponent } from './depositpopup.component';

describe('DepositpopupComponent', () => {
  let component: DepositpopupComponent;
  let fixture: ComponentFixture<DepositpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

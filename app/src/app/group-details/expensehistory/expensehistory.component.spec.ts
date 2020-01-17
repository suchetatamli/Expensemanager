import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensehistoryComponent } from './expensehistory.component';

describe('ExpensehistoryComponent', () => {
  let component: ExpensehistoryComponent;
  let fixture: ComponentFixture<ExpensehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

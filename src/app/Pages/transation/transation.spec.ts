import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transation } from './transation';

describe('Transation', () => {
  let component: Transation;
  let fixture: ComponentFixture<Transation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transation],
    }).compileComponents();

    fixture = TestBed.createComponent(Transation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

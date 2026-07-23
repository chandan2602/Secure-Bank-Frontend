import { TestBed } from '@angular/core/testing';

import { Transations } from './transations';

describe('Transations', () => {
  let service: Transations;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transations);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

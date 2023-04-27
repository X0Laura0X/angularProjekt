import { TestBed } from '@angular/core/testing';

import { BrofistService } from './brofist.service';

describe('BrofistService', () => {
  let service: BrofistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrofistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

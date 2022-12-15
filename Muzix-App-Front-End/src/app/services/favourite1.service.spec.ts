import { TestBed } from '@angular/core/testing';

import { Favourite1Service } from './favourite1.service';

describe('Favourite1Service', () => {
  let service: Favourite1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Favourite1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GrupoCrudService } from './grupo-crud.service';

describe('GrupoCrudService', () => {
  let service: GrupoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

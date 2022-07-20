import { TestBed } from '@angular/core/testing';

import { HospedeCrudService } from './hospede-crud.service';

describe('HospedeCrudService', () => {
  let service: HospedeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospedeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

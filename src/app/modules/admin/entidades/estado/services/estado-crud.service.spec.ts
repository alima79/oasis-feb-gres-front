import { TestBed } from '@angular/core/testing';

import { EstadoCrudService } from './estado-crud.service';

describe('EstadoCrudService', () => {
  let service: EstadoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

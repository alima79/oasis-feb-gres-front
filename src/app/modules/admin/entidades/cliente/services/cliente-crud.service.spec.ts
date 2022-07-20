import { TestBed } from '@angular/core/testing';

import { ClienteCrudService } from './cliente-crud.service';

describe('ClienteCrudService', () => {
  let service: ClienteCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

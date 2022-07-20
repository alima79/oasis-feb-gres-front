import { TestBed } from '@angular/core/testing';

import { ExtrasCrudService } from './extras-crud.service';

describe('ExtrasCrudService', () => {
  let service: ExtrasCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrasCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

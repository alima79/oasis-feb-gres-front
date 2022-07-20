import { TestBed } from '@angular/core/testing';

import { SeatingCrudService } from './seating-crud.service';

describe('SeatingCrudService', () => {
  let service: SeatingCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatingCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

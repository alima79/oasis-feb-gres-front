import { TestBed } from '@angular/core/testing';

import { RestauranteSeatingCrudService } from './restaurante-seating-crud.service';

describe('RestauranteSeatingCrudService', () => {
  let service: RestauranteSeatingCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranteSeatingCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

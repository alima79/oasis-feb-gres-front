/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/internal/Observable';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { MReserva } from '../models/m-reserva';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiCrudService } from '../../../../../my-core/services/api-crud.service';
import { MReserva } from '../models/m-reserva';


@Injectable({
  providedIn: 'root'
})
export class ReservaCrudService extends ApiCrudService<MReserva>{

  constructor(protected override  http: HttpClient) {
    super(http, "reservas");
  }
  
}

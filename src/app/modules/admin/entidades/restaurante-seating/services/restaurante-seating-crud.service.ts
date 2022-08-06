import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { IResponsePageableRestauranteSeating } from '../interfaces/i-response-pageable-restaurante-seating';
import { MRestauranteSeating } from '../models/m-restaurante-seating';
import { take, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestauranteSeatingCrudService extends ApiCrudService<MRestauranteSeating>{

  constructor(protected override  http: HttpClient) {
    super(http, "restauranteSeating");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestauranteSeating> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestauranteSeating>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}

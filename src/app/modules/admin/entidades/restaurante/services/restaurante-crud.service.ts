import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { IResponsePageableRestaurante } from '../interfaces/i-response-pageable-restaurante';
import { MRestaurante } from '../models/m-restaurante';
import { take, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestauranteCrudService extends ApiCrudService<MRestaurante>{

  constructor(protected override  http: HttpClient) {
    super(http, "restaurantes");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableRestaurante> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableRestaurante>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  hello(){
    console.log("Hello no Restaurante CRUD SERVICE");
  }
}

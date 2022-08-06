import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { IResponsePageableCliente } from '../interfaces/i-response-pageable-cliente';
import { MCliente } from '../models/m-cliente';
import { take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteCrudService extends ApiCrudService<MCliente>{

  constructor(protected override  http: HttpClient) {
    super(http, "clientes");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableCliente> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableCliente>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}

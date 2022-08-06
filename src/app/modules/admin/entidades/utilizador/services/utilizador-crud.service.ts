import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { take, delay } from 'rxjs/operators';
import { MUtilizador } from '../models/m-utilizador';
import { IResponsePageableUtilizador } from '../interfaces/i-response-pageable-utilizador';
@Injectable({
  providedIn: 'root'
})
export class UtilizadorCrudService extends ApiCrudService<MUtilizador>{

  constructor(protected override  http: HttpClient) {
    super(http, "utilizadores");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableUtilizador> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableUtilizador>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}

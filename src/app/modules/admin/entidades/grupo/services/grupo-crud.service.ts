import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { take, delay, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IResponsePageableGrupo } from '../interfaces/i-response-pageable-grupo';
import { MGrupo } from '../models/m-grupo';
@Injectable({
  providedIn: 'root'
})
export class GrupoCrudService extends ApiCrudService<MGrupo>{

  constructor(protected override  http: HttpClient) {
    super(http, "grupos");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableGrupo> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableGrupo>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}
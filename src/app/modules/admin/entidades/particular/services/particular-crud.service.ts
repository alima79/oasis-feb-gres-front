import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { take, delay, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IResponsePageableParticular } from '../interfaces/i-response-pageable-particular';
import { MParticular } from '../models/m-particular';


@Injectable({
  providedIn: 'root'
})
export class ParticularCrudService extends ApiCrudService<MParticular>{

  constructor(protected override  http: HttpClient) {
    super(http, "particulares");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableParticular> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableParticular>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { take, delay, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MMenu } from '../models/m-menu';
import { IResponsePageableMenu } from '../interfaces/i-response-pageable-menu';


@Injectable({
  providedIn: 'root'
})
export class MenuCrudService extends ApiCrudService<MMenu>{

  constructor(protected override  http: HttpClient) {
    super(http, "menus");
   }

   findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableMenu> {

    //http://localhost:8686/xxxxxx?page=0&size=2&sort=nome,asc

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableMenu>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

}
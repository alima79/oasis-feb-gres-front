import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError} from 'rxjs';
import { ApiCrudService } from 'src/app/my-core/services/api-crud.service';
import { IResponsePageableSeating } from '../interfaces/i-response-pageable-seating';
import { MSeating } from '../models/m-seating';
import { take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeatingCrudService extends ApiCrudService<MSeating>{

  constructor(protected override  http: HttpClient) { 
    super(http, "seatings");
  }

  findAll(page: number, size: number, sort: string, ordem: string): Observable<IResponsePageableSeating> {

    let url = `${super.getAPIURL}?page=${page}&size=${size}&sort=${sort},${ordem}`;
    return this.http.get<IResponsePageableSeating>(url, {headers: super.getheaders}).pipe(
      delay(2000),
      take(1),
      catchError(this.errorMgmt));
  }

  hello(){
    console.log("Hello no Seating CRUD SERVICE");
  }

}

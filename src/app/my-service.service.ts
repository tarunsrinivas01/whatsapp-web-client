import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/signup',data);
  }
}

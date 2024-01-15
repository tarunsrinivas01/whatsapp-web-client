import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  token:any = localStorage.getItem('token')

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/signup',data);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/user/getUsers')
  }

  loginUser(data:any) {
    return this.http.post('http://localhost:3000/user/login',data)
  }

  sendChat(data:any) {
    return this.http.post('http://localhost:3000/chat/sendmessage',data)
  }

  getChats(selectedUserEmail:any) {
    return this.http.get(`http://localhost:3000/chat/getmessages/${selectedUserEmail}`)
  }
}

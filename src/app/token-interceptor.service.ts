import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(public _cookieService: CookieService) { }

  intercept(req: any, next: any) {
    let token = this._cookieService.get('token') || ''
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    })
    return next.handle(tokenizedReq)
  }
}

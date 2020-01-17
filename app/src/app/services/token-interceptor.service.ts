import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next){  
    let headerdata = {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.getItem('_token')}`
    };
    
    let tokenizedReq = req.clone({
      setHeaders: headerdata
    })
    return next.handle(tokenizedReq);
  }
}
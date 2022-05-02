import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

// const TOKEN_HEADER_KEY = 'Authorization';       
const TOKEN_HEADER_KEY = 'x-access-token';   

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService ,private userservice:UserService ,private authservice:AuthService) { }

 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor')
    let authReq = req;
    const token = this.token.getToken();
    if (token == null){
      return next.handle(req);
    }
    const checkToken =JSON.parse(this.token.getToken() as any).token;
    req = (checkToken && checkToken != null) ? req.clone({
    
      setHeaders: {
        Authorization: `Bearer ${checkToken}`
      },
      // setParams: {
      //   lang: this.translate.currentLang
      // }
    }) : req.clone({
      // setParams: {
      //   lang: this.translate.currentLang
      // }
    });
    
    // if (token != null) {
   
    //   authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    // }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];



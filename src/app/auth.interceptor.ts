import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>>  {
    const accessToken = this.authService.getAccessToken();
    req = req.clone({
        setHeaders: {
            Authorization: `${accessToken}` 
        }
    });
    return next.handle(req);
}
}

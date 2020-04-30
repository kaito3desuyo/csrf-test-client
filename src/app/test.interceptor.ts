import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const headerName = 'x-xsrf-token';
    const token = this.tokenService.getToken();
    console.log('token', token);

    if (
      token !== null &&
      req.headers.has(headerName) // &&
      // req.url.startsWith(environment.apiRoot)
    ) {
      req = req.clone({
        headers: req.headers.set(headerName, token),
      });
    }

    return next.handle(req);
  }
}

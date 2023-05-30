import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        error => {
          //if (error.status === 401) {
          //  console.error('Erro de autenticação:', error);
//
          //  alert(`Erro de autenticação: ${JSON.stringify(error)}. A pagina será recarregada.`)
          //  window.location.reload();
          //}
        }
      )
    );
  }
}

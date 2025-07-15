import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { AppNotificationService } from '../services/app-notification.service';
import { HttpCancelService } from '../services/http-cancel.service';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const notify = inject(AppNotificationService);
  const httpCancelService = inject(HttpCancelService);

  // Cancel Http on route change
  router.events.subscribe((event) => {
    // An event triggered at the end of the activation part of the Resolve phase of routing.
    if (event instanceof ActivationEnd) {
      httpCancelService.cancelPendingRequests();
    }
  });

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      },
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            console.error('*** ', err.error);
            // const messages = err.error.errors.map((e: any) => e[0]).join(', ')
            // Object.keys(err.error.errors).forEach((key) => {
            //   notify.error(err.error.errors[key], 'A bad request')
            // })

            notify.error(err.error, 'Bad Request');
          }
          if (err.status === 401) {
            console.warn('*** Unauthorized', err);
            router.navigate(['/app/not-authenticated']);
          }
          if (err.status === 403) {
            console.warn('*** Forbidden', err);
            notify.warning(
              'You are not allowed access to this resource.',
              'Forbidden'
            );
          }
          if (err.status === 500) {
            console.error('*** Server Error', err.error);
            notify.error(
              err.error.Type ? err.error.Type : 'Check console for info',
              'Server Error'
            );
          }
          if (err.status === 504) {
            console.error('*** Gateway Timeout', err);
          }
          if (err.status === 0) {
            notify.default('Unable to connect.', 'Server Connection Error');
          }
        }
      },
    }),
    catchError((err, caught) => {
      console.log('*** INTERCEPTOR', { err });
      throw err;
    }),
    takeUntil(httpCancelService.onCancelPendingRequests())
  );
}

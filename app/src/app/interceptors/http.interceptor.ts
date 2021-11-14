import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingBarService } from '../services/loading-bar.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorOwn implements HttpInterceptor {

  constructor(private loadingBarService: LoadingBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loadingBarService.requestStarted()
    return this.handler(next, request);
  }

  handler(next, request) {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.loadingBarService.requestEnded()
          }
        },
        (error: HttpErrorResponse) => {
          this.loadingBarService.resetRequest()
          throw error
        }
      ))
  }
}

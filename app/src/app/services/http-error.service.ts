import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, of, ReplaySubject } from 'rxjs';
import { ErrorDTO } from '../dto/error.dto';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }

  public err: ErrorDTO = undefined;
  public observer = Observable.create(observer => {
    setInterval(() => {
      observer.next(this.err)
    }, 2000)
  });

  initError(): Observable<ErrorDTO> {
    return this.observer
  }
  deleteError() {
    this.err = undefined
  }

  createError(msg: string, loc: string, code: number) {
    this.err = {
      message: msg,
      code: code,
      locaition: loc
    }
  }
}

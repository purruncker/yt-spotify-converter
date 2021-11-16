import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { ErrorDTO } from '../dto/error.dto';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }

  private err: ErrorDTO = undefined;
  public observer = new BehaviorSubject<ErrorDTO>(undefined)

  initError(): Observable<ErrorDTO> {
    return this.observer.asObservable()
  }
  deleteError() {
    this.err = undefined
    this.observer.next(this.err)
  }

  createError(msg: string, loc: string, code: number) {
    this.err = {
      message: msg,
      code: code,
      locaition: loc
    }
    this.observer.next(this.err)
  }
}

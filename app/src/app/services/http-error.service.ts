import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ErrorDTO } from '../dto/error.dto';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }
  private error: ErrorDTO = undefined;

  public createHttpError(msg: string, errCode: number) {
    this.error = {
      HttmlCode: errCode,
      message: msg
    }
  }

  public initError() {
    return of(this.error)
  }

  public deleteError() {
    this.error = undefined;
  }
}

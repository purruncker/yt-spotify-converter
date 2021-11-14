import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  private showLoading = false;
  private Loading = new BehaviorSubject<boolean>(false);
  constructor() { }

  getLoadingBarObserver(): Observable<boolean> {
    return this.Loading.asObservable();
  }

  requestStarted() {
    if (this.showLoading = true) {
      this.Loading.next(true);
    }
  }

  requestEnded() {
    if (this.showLoading) {
      this.showLoading = false;
      this.Loading.next(false);
    }
  }
  resetRequest() {
    this.showLoading = false;
    this.Loading.next(false)
  }
}

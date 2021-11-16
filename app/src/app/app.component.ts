import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { subscribeOn, take, takeUntil } from 'rxjs/operators';
import { ErrorDTO } from './dto/error.dto';
import { HttpErrorService } from './services/http-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private errService: HttpErrorService, private httpclient: HttpClient) {

  }
  public error: ErrorDTO = undefined;

  public async ngOnInit(): Promise<void> {
    this.errService.initError().subscribe(data => {
      this.error = data;
    })
  }

  getuserInfo() {
    const opts = {
      headers: new HttpHeaders({

        "Authorization": "Bearer " + "token123 "
      })
    }

    this.httpclient.get("http://localhost:3000/user-info", opts).toPromise().then(data => console.log(data))
  }


}
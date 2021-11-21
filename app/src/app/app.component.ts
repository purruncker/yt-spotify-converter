import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { subscribeOn, take, takeUntil } from 'rxjs/operators';
import { ErrorDTO } from './dto/error.dto';
import { AuthenticationService } from './services/authentication.service';
import { HttpErrorService } from './services/http-error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private errService: HttpErrorService, private httpclient: HttpClient, private as: AuthenticationService) {

  }
  public error: ErrorDTO = undefined;

  public async ngOnInit(): Promise<void> {
    this.errService.initError().subscribe(data => {
      this.error = data;
    })
  }

  async getuserInfo() {
    let token = ""
    await this.as.$session.subscribe(data => token = data.accessToken)
    const opts = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token
      })
    }

    this.httpclient.get("http://localhost:3000/recommendation/spotify", opts).toPromise().then(data => console.log(data))
  }


  async getSongs() {
    let token = ""
    await this.as.$session.subscribe(data => token = data.accessToken)
    const opts = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token
      })
    }

    this.httpclient.get("http://localhost:3000/v1/songs/5j2zHJVYBzbqVebj6O0jq8", opts).toPromise().then(data => console.log(data))
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'app';

  private client_id: string = "52b5a2676ba940f8922f7b62fe0679c0";
  private scope: string = "user-read-private playlist-read-private playlist-read-collaborative user-read-email";

  private token:String ="";
  constructor(private currentRoute: ActivatedRoute, private httpclient : HttpClient){}

  public async loginWithSpotify(): Promise<void> {
    const data = {
      response_type: 'token',
      client_id: this.client_id,
      scope: this.scope,
      redirect_uri: "http://localhost:4200",
      state: "veryRandomString123"
    }
    window.location.href = "https://accounts.spotify.com/authorize?" + querystring.stringify(data);
  }

  public async ngOnInit(): Promise<void> {
    // this.currentRoute.queryParams.subscribe((map) => {
    //   console.log(map['access_token']);
    //   console.log(this.token)
    // })
    this.currentRoute.queryParams.subscribe(map => {

      console.log(map);
      this.token = map['access_token'];
      console.log(this.token)
    })
  }

  public name:String ="";

  public async hello() : Promise<void>{

    const opts = {
      headers : new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.token
      })
    }
    console.log(this.token);
    this.httpclient.get("https://api.spotify.com/v1/me",opts).toPromise().then(data=>
    {
      this.name = data['display_name'];
      console.log(this.name);
    }
    )
  } 
}

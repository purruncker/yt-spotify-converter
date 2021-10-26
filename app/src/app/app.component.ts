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
  private scope: string = "";

  constructor(private currentRoute: ActivatedRoute){}

  public async loginWithSpotify(): Promise<void> {
    const data = {
      response_type: 'code',
      client_id: this.client_id,
      scope: this.scope,
      redirect_uri: "http://localhost:4200",
      state: "veryRandomString123"
    }
    
    window.location.href = "https://accounts.spotify.com/authorize?" + querystring.stringify(data);
  }

  public async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((map) => {
      console.log(map.code)
    })
  }

  
}

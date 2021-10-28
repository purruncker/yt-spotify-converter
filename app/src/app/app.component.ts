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
  private scope: string = "playlist-read-private playlist-read-collaborative";

  constructor(private currentRoute: ActivatedRoute, private httpclient : HttpClient){}

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

  public name:String ="";

  public async hello() : Promise<void>{

    const fakeTOken: string = "BQDGh8uLE7-jb4ySk63zxYNA9871regtlGYfvDObOsJRo6xdEzXuG4IHVzmsrXvjf2eSisdcnl8JXK2RNyq2Jcc0kidaAg4JvgwNcnqHUzQxxWSi9VTMsmr3tVqwMk_x06MVB_YAIuWCWop1qX6mCbkMMja-cR8dnJnfvP0djzyI";

    const opts = {
      headers : new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + fakeTOken
      })
    }
    this.httpclient.get("https://api.spotify.com/v1/me",opts).toPromise().then(data=>
    {
      this.name = data['display_name'];
      console.log(this.name);
    }
    )
  } 
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { playlist } from '../app/playlist'

import { first, map } from "rxjs/operators"
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;

  public title = 'app';

  private client_id: string = "52b5a2676ba940f8922f7b62fe0679c0";
  private scope: string = "user-read-private playlist-read-private playlist-read-collaborative user-read-email";
  private accessToken?: string;

  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router) { }

  public async requestSpotifyGrantCode(): Promise<void> {
    const data = {
      response_type: 'code',
      client_id: this.client_id,
      scope: this.scope,
      redirect_uri: "http://localhost:4200",
      state: "veryRandomString123"
    }

    window.location.href = "https://accounts.spotify.com/authorize?" + querystring.stringify(data);
  }

  public requestSpotifyAccessToken(grantCode: string): Observable<string> {
    return this.httpclient.post<string>("http://localhost:3000/authentication", { grantCode }).pipe(
      // Only get first
      first(),

      // Extract accessToken from response and return only
      // the value.
      map((value) => {
        return value["access_token"]
      })
    )
  }

  public async ngOnInit(): Promise<void> {
    this.currentRoute.queryParams.subscribe((map) => {
      // TODO: Create route (e.g.: /authenticate) to receive login attempt

      // Received grant_code.
      // This is used to request an access_token, which is used
      // for future requests to spotify.
      const grantCode = map.code;

      // Prevent error, because observer also triggered if route
      // is accessed without a ?code query param.
      if (!grantCode) return;

      // Reset query params by navigating to exact same route
      // but replacing queryParams. This prevents unknown
      // grant_code error.
      this.router.navigate([], {
        relativeTo: this.currentRoute,
        queryParams: {}
      })

      // Request the access token
      this.requestSpotifyAccessToken(grantCode).subscribe((access_token) => {
        console.log(access_token)

        this.accessToken = access_token
        this.hello()
        this.getPlaylists()
      })
    })
  }

  public name: String = "";

  public async hello(): Promise<void> {

    const opts = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.accessToken
      })
    }
    this.httpclient.get("https://api.spotify.com/v1/me", opts).toPromise().then(data => {
      this.name = data['display_name'];
      console.log(this.name);
    }
    )
  }

  public playlists: playlist[] = [];

  public async getPlaylists(): Promise<playlist[]> {

    this.httpclient.get("http://localhost:3000/spotify-playlist/" + this.accessToken).toPromise().then(data => {
      this.playlists = data as playlist[];
    }
    )
    return this.playlists
  }

}

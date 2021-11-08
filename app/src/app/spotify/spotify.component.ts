import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { playlist } from './playlist'

import { first, map } from "rxjs/operators"
import { song } from './songs';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {
  [x: string]: any;

  public title = 'app';
  public parentdata: string = "test moin!";
  // private client_id_spotify: string = "52b5a2676ba940f8922f7b62fe0679c0";
  private client_id_spotify: string = "155c517b9e2548f0805bbc3b30896d63";

  private playlistScopes: string = "playlist-read-private playlist-read-collaborative"
  private scope_spotify: string = `user-read-private user-read-email ${this.playlistScopes}`;
  public accessToken?: string = '';

  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router) { }

  public async requestSpotifyGrantCode(): Promise<void> {
    const data = {
      response_type: 'code',
      client_id: this.client_id_spotify,
      scope: this.scope_spotify,
      redirect_uri: "http://localhost:4200/spotify",
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
    //console.log(this.accessToken);
    //TODO: Localstorage for token
    this.currentRoute.queryParams.subscribe((map) => {
      // TODO: Create route (e.g.: /authenticate) to receive login attempt
      //console.log(map.code);
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
        //console.log(access_token)

        this.accessToken = access_token
        //console.log(access_token);
        this.hello()
        this.getPlaylists()
      })

    })
  }

  public name: String = "";
  public showName: Boolean = true;

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
      //console.log(this.name);
    }
    )
    this.showName = true;
  }

  public playlists: playlist[] = [];
  public showPlaylists: boolean = true;

  public async getPlaylists(): Promise<playlist[]> {

    this.httpclient.get("http://localhost:3000/spotify-playlist/" + this.accessToken).toPromise().then(data => {
      this.playlists = data as playlist[];
    }
    )
    this.showPlaylist = true;
    return this.playlists
  }

  public songs: song[] = [];
  public showSongs: boolean = false;

  public async getSongs(id: string) {
    //console.log(id);
    const params = new HttpParams()
      .set('token', this.accessToken);
    //console.log(params);
    await this.httpclient.get("http://localhost:3000/songs/" + id, { params }).toPromise().then(data => {
      this.songs = data as song[];
    })
    this.showPlaylists = false;
    this.showName = false;
    localStorage.setItem('songs', JSON.stringify(this.songs));
    //console.log(JSON.parse(localStorage.getItem('songs')));
    this.router.navigate(['/yt'])
    return this.songs;
  }


}

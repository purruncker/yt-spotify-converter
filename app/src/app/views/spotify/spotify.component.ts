import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { first, map } from "rxjs/operators"
import { SpotifyPlaylistDTO } from 'src/app/dto/spotifyPlaylist.dto';
import { SongDTO } from 'src/app/dto/song.dto';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  [x: string]: any;

  public title = 'app';
  public parentdata: string = "test moin!";
  public accessToken?: string = '';

  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router) { }

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
    ).catch((error) => {
      console.log(error);
      this.errService.createError("Dein Name konnten nicht abgerufen werden", "getUserInfo Spotify", error.code)
    })
    this.showName = true;
  }

  public playlists: SpotifyPlaylistDTO[] = [];
  public showPlaylists: boolean = true;

  public async getPlaylists(): Promise<SpotifyPlaylistDTO[]> {

    this.httpclient.get("http://localhost:3000/spotify-playlist/" + this.accessToken).toPromise().then(data => {
      this.playlists = data as SpotifyPlaylistDTO[];
    }
    ).catch((error) => {
      console.log(error);
      this.errService.createError("Deine Playlisten konnten nicht abgerufen werden", "getPlaylists Spotify", error.code)
    })
    this.showPlaylist = true;
    return this.playlists
  }

  public songs: SongDTO[] = [];
  public showSongs: boolean = false;

  public async getSongs(id: string) {
    //console.log(id);
    const params = new HttpParams()
      .set('token', this.accessToken);
    //console.log(params);
    await this.httpclient.get("http://localhost:3000/songs/" + id, { params }).toPromise().then(data => {
      this.songs = data as SongDTO[];
    }).catch((error) => {
      console.log(error);
      this.errService.createError("Deine Songs konnten nicht abgerufen werden", "getSongs Spotify", error.code)
    })
    this.showPlaylists = false;
    this.showName = false;
    localStorage.setItem('songs', JSON.stringify(this.songs));
    //console.log(JSON.parse(localStorage.getItem('songs')));
    this.router.navigate(['/yt'])
    return this.songs;
  }


}

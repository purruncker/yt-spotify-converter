import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { first, map } from "rxjs/operators"
import { SpotifyPlaylistDTO } from 'src/app/dto/spotifyPlaylist.dto';
import { SongDTO } from 'src/app/dto/song.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.scss']
})
export class SpotifyComponent implements OnInit {

  [x: string]: any;

  public title = 'app';
  public parentdata: string = "test moin!";

  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router, private authService: AuthenticationService) { }

  public async ngOnInit(): Promise<void> {
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
      // TODO: Create component with separate route to handle authentication processes in one place (e.g.: /authorize/:platform --> /authorize/spotify?code=...). This can be shown as component in the flow
      
      this.hello();
      this.getPlaylists();
      /*this.authService.requestSpotifyAccessToken(grantCode).then((response) => {
        console.log(response);
        this.hello()
        this.getPlaylists()
      })*/

    })
  }

  public name: String = "";
  public showName: Boolean = true;

  public async hello(): Promise<void> {

    const opts = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.authService.getSessionSnap().accessToken
      })
    }
    this.httpclient.get("https://api.spotify.com/v1/me", opts).toPromise().then(data => {
      this.name = data['display_name'];
      //console.log(this.name);
    }
    ).catch((error) => {
      console.log(error);
      this.errService.createError("Dein Name konnten nicht abgerufen werden", "getUserInfo Spotify", error.status)
    })
    this.showName = true;
  }

  public playlists: SpotifyPlaylistDTO[] = [];
  public showPlaylists: boolean = true;

  public async getPlaylists(): Promise<SpotifyPlaylistDTO[]> {

    // TODO: Make access token a header and read it in nestjs
    this.httpclient.get("http://localhost:3000/spotify-playlist/" + this.authService.getSessionSnap().accessToken).toPromise().then(data => {
      this.playlists = data as SpotifyPlaylistDTO[];
    }
    ).catch((error) => {
      console.log(error);
      this.errService.createError("Deine Playlisten konnten nicht abgerufen werden", "getPlaylists Spotify", error.status)
    })
    this.showPlaylist = true;
    return this.playlists
  }

  public songs: SongDTO[] = [];
  public showSongs: boolean = false;

  public async getSongs(id: string) {
    //console.log(id);
    const params = new HttpParams()
      .set('token', this.authService.getSessionSnap().accessToken);
    //console.log(params);
    await this.httpclient.get("http://localhost:3000/songs/" + id, { params }).toPromise().then(data => {
      this.songs = data as SongDTO[];
      
    }).catch((error) => {
      console.log(error);
      this.errService.createError("Deine Songs konnten nicht abgerufen werden", "getSongs Spotify", error.status)
    })
    this.showPlaylists = false;
    this.showName = false;
    localStorage.setItem('songs', JSON.stringify(this.songs));
    //console.log(JSON.parse(localStorage.getItem('songs')));
    this.router.navigate(['/yt'])
    return this.songs;
  }


}

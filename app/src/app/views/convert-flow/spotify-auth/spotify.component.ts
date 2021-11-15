import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';

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

  constructor(
    private httpclient: HttpClient, 
    private router: Router, 
    public authService: AuthenticationService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.getPlaylists();
  }

  public showName: Boolean = true;
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

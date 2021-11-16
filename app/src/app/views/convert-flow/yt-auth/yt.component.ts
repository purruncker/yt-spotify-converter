import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { PlaylistService } from 'src/app/services/playlist.service';
import { SongDTO } from '../../../dto/song.dto';
import { FillYtPlaylist, IdsToInsertDTO, YtPlaylistDTO } from '../../../dto/ytPlaylist.dto';
import { HttpErrorService } from '../../../services/http-error.service';

//import { first, map } from "rxjs/operators"

@Component({
  selector: 'app-yt',
  templateUrl: './yt.component.html',
  styleUrls: ['./yt.component.scss']
})
export class YtComponent implements OnInit {

  //@Input('testdata') public test;
  plalistNameform: FormGroup
  constructor(
    private currentRoute: ActivatedRoute,
    private httpclient: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder,
    private errService: HttpErrorService,
    private playlistService: PlaylistService
  ) {
    this.plalistNameform = this.formbuilder.group({
      plalistName: formbuilder.control('', [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9]+$')]),
      status: formbuilder.control("unlisted", [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ0-9]+$')]),
      plalistDescription: formbuilder.control("", Validators.maxLength(99))
    })
  }

  public accessToken?: string = '';
  public songs: SongDTO[] = [];

  ngOnInit(): void {
    //console.log(this.test);
    //TODO: Localstorage for token

    if (this.playlistService.getSelectedSongsSnap()) {
      this.songs = this.playlistService.getSelectedSongsSnap().map((song) => {
        return {
          id: song.id,
          artists: song.artists.map((artist) => artist.name),
          imageHref: song.coverUrl,
          name: song.title
        } as SongDTO;
      })
    }

    if (sessionStorage.getItem('songs') != undefined) {
      this.songs = JSON.parse(localStorage.getItem('songs'))

      //localStorage.getItem('songs')
      //TODO: Remove after the export is done 
      //if (localStorage)
    }
    // if (localStorage.getItem('ytSongs') != undefined) {
    //   this.ytSongs = JSON.parse(localStorage.getItem('ytSongs'))
    // }

    this.currentRoute.queryParams.subscribe((map) => {
      const grantCode = map.code;
      if (!grantCode) return;
      //console.log(grantCode);

      this.router.navigate([], {
        relativeTo: this.currentRoute,
        queryParams: {}
      })

      this.requestYtAccessToken(grantCode).subscribe((access_token) => {
        //console.log(access_token)
        this.accessToken = access_token;
        //console.log(this.accessToken)
      })
    }
    )
  }

  private client_id_youtube: string = "429913780229-21c99v1n1uubuu22l2afvvmetio46ldp.apps.googleusercontent.com";
  private scope_youtube: string = "https://www.googleapis.com/auth/youtube.force-ssl";

  public async requestYoutubeGrantCode(): Promise<void> {
    const data = {
      client_id: this.client_id_youtube,
      scope: this.scope_youtube,
      redirect_uri: "http://localhost:4200/yt",
      response_type: "code"
    }

    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?" + querystring.stringify(data);

  }

  public requestYtAccessToken(grantCode: string): Observable<string> {
    return this.httpclient.post<string>("http://localhost:3000/yt-auth", { grantCode }).pipe(
      first(),

      map((value) => {
        return value["access_token"]
      })
    )
  }

  public showSongs: boolean = false;
  public toggleSongs() {
    this.showSongs = !this.showSongs;
  }

  public ytPlaylist: YtPlaylistDTO = undefined;
  public stopInPut: boolean = true;
  public async onSubmitPlaylistname() {
    this.stopInPut = !this.stopInPut;
    //console.log(this.plalistNameform.value['plalistName'])
    //console.log(this.plalistNameform.value['status'])
    const body = {

      playlistName: this.plalistNameform.value['plalistName'],
      acessToken: this.accessToken,
      status: this.plalistNameform.value['status'],
      description: this.plalistNameform.value['plalistDescription']

    }
    //console.log(body);
    await this.httpclient.post("http://localhost:3000/playlist-yt", body).toPromise().then(data => {
      this.ytPlaylist = data;
    }).catch((error) => {
      console.log(error);
      this.errService.createError("playlist konnte nicht angelegt werden", "create YT playlist", error.code)
    })
  }

  public fillPlaylist: FillYtPlaylist = undefined;
  public ytSongs: IdsToInsertDTO[] = [];
  public async getInsertSongs() {


    const body = {
      accesToken: this.accessToken,
      id: "PLjC_caSoMHYDUdYO8JiX8yBQKGOhNWAi0",
      songs: this.songs
    }

    await this.httpclient.post("http://localhost:3000/yt-songs", body).toPromise().then(data => {
      console.log(data);
      this.ytSongs = data as IdsToInsertDTO[];
      localStorage.setItem('ytSongs', JSON.stringify(this.ytSongs));
      console.log(this.ytSongs)
    }).catch((error) => {
      console.log(error);
      this.errService.createError("Songs konnten nicht gefetcht werden (reached max export limit)", "get YT songIds", error.status)
    })
  }

  public async excludeSong(id: string) {
    const index = this.ytSongs.findIndex((song) => song.id == id);
    this.ytSongs.splice(index, 1);
    console.log(index, this.ytSongs)
  }
  public showExport: boolean = true;

  public async startInsertSongs() {
    this.showExport = false;
    const ids: string[] = this.ytSongs.map(song => song.id)

    await this.httpclient.post("http://localhost:3000/yt-songs/insert/" + this.accessToken + "/" + this.ytPlaylist.id, ids).toPromise().then(data => {
      console.log(data)
    }).catch((error) => {
      console.log(error);
      this.errService.createError("playlist konnte nicht gefüllt werden", "fill YT playlist", error.status)
    })
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SongDTO } from 'src/app/dto/song.dto';

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
    private formbuilder: FormBuilder
  ) {
    this.plalistNameform = this.formbuilder.group({
      plalistName: formbuilder.control('', [Validators.required]),
      status: formbuilder.control("unlisted", [Validators.required])
    })
  }

  public accessToken?: string = '';
  public songs: SongDTO[] = [];

  ngOnInit(): void {
    //console.log(this.test);
    //TODO: Localstorage for token
    if (localStorage.getItem('songs') != undefined) {
      this.songs = JSON.parse(localStorage.getItem('songs'))

      //localStorage.getItem('songs')
      //TODO: Remove after the export is done 
      //if (localStorage)
    }

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
        console.log(this.accessToken)
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

  public onSubmitPlalistname() {
    //console.log(this.plalistNameform.value['plalistName'])
    //console.log(this.plalistNameform.value['status'])
    const body = {

      playlistName: this.plalistNameform.value['plalistName'],
      acessToken: this.accessToken,
      status: this.plalistNameform.value['status']

    }
    //console.log(body);
    this.httpclient.post("http://localhost:3000/playlist-yt", body).toPromise().then(data => {
      console.log(data)
    })
  }

}

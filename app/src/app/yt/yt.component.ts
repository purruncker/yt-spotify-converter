import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { song } from '../spotify/songs';

//import { first, map } from "rxjs/operators"

@Component({
  selector: 'app-yt',
  templateUrl: './yt.component.html',
  styleUrls: ['./yt.component.scss']
})
export class YtComponent implements OnInit {

  //@Input('testdata') public test;

  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router) { }

  public accessToken?: string = '';
  public songs: song[] = [];

  ngOnInit(): void {
    //console.log(this.test);
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
      })
    }
    )
  }

  private client_id_youtube: string = "429913780229-21c99v1n1uubuu22l2afvvmetio46ldp.apps.googleusercontent.com";
  private scope_youtube: string = "https://www.googleapis.com/auth/youtube";

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
      // Only get first
      first(),

      // Extract accessToken from response and return only
      // the value.
      map((value) => {
        return value["access_token"]
      })
    )
  }

}

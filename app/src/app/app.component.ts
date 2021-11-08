import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as querystring from "query-string";
import { Observable } from 'rxjs';
import { playlist } from './spotify/playlist'

import { first, map } from "rxjs/operators"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private currentRoute: ActivatedRoute, private httpclient: HttpClient, private router: Router) { }

  public async ngOnInit(): Promise<void> {
  }

  public async home() {
    await window.location.reload()
    // this.requestSpotifyGrantCode()
  }

}
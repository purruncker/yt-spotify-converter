import { Component, OnInit } from '@angular/core';
import * as querystring from "query-string";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private client_id_spotify: string = "155c517b9e2548f0805bbc3b30896d63";
  private playlistScopes: string = "playlist-read-private playlist-read-collaborative"
  private scope_spotify: string = `user-read-private user-read-email ${this.playlistScopes}`;

  constructor() { }

  ngOnInit(): void {
  }

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

}

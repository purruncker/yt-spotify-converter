import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from 'src/app/model/playlist.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlowService } from 'src/app/services/flow.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.scss']
})
export class ChoosePlaylistComponent implements OnInit {

  
  [x: string]: any;

  public title = 'app';
  public parentdata: string = "test moin!";

  public showName: Boolean = true;
  public playlists: Playlist[] = [];
  public showPlaylists: boolean = true;

  constructor(
    private router: Router, 
    public authService: AuthenticationService,
    private playlistService: PlaylistService,
    private flowService: FlowService
  ) { }

  public async ngOnInit(): Promise<void> {
    this.playlistService.findPlaylists().then((playlists) => this.playlists = playlists);
  }

  public selectPlaylist(playlist: Playlist): void {
    this.flowService.nextStep();
    this.playlistService.setSelectedPlaylist(playlist)
    this.router.navigate(["/choose-songs"])
  }

}

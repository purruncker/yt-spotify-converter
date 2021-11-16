import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/model/song.model';
import { FlowService } from 'src/app/services/flow.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-choose-songs',
  templateUrl: './choose-songs.component.html',
  styleUrls: ['./choose-songs.component.scss']
})
export class ChooseSongsComponent implements OnInit {

  public songs: Song[] = [];

  constructor(
    private router: Router,
    private playlistService: PlaylistService,
    private flowService: FlowService
  ) { }

  ngOnInit(): void {
    // TODO: Adding pagination needs this to be an observable
    this.playlistService.findSongsOfPlaylist(this.playlistService.getSelectedPlaylistSnap().id).then((songs) => this.songs = songs)
  }

  public unselectSong(song: Song): void {
    const index = this.songs.findIndex((s) => s.id == song.id);
    this.songs.splice(index, 1);
  }

  public finishSelection(): void {
    // TODO: Do proper validation
    if(this.songs.length <= 0) return;

    this.playlistService.setSelectedSongs(this.songs)
    this.flowService.nextStep();
    this.router.navigate(["/yt"])
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/model/playlist.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() public playlist: Playlist;
  @Output() public selected: EventEmitter<Playlist> = new EventEmitter();

  public isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public selectPlaylist(): void {
    this.selected.emit(this.playlist)
  }

}

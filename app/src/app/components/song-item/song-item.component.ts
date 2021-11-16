import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Song } from 'src/app/model/song.model';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.scss']
})
export class SongItemComponent implements OnInit {

  @Input() public song: Song;

  // TODO: Implement radio buttons to better show selection
  @Output() public unselected: EventEmitter<Song> = new EventEmitter();

  public isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public selectPlaylist(): void {
    this.unselected.emit(this.song)
  }

}

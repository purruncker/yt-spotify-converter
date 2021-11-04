import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistSpotifyService } from './playlist-spotify.service';
import { CreatePlaylistSpotifyDto } from './dto/create-playlist-spotify.dto';
import { CurrentUseresSpotifyPlaylistsDTO } from './dto/playlist-spotify.dto';



@Controller('spotify-playlist')
export class PlaylistSpotifyController {
  constructor(private readonly playlistSpotifyService: PlaylistSpotifyService) { }

  @Get(':token')
  create(@Param("token") createPlaylistSpotifyDto: CreatePlaylistSpotifyDto) {
    return this.playlistSpotifyService.get(createPlaylistSpotifyDto);
  }

}

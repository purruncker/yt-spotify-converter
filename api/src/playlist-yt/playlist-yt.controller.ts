import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistYtService } from './playlist-yt.service';
import { CreatePlaylistYtDto } from './dto/create-playlist-yt.dto';
import { ResultPlaylistYtDto } from './dto/update-playlist-yt.dto';

@Controller('playlist-yt')
export class PlaylistYtController {
  constructor(private readonly playlistYtService: PlaylistYtService) { }

  @Post()
  create(@Body() CreatePlaylistYtDto: CreatePlaylistYtDto) {
    return this.playlistYtService.createPlaylist(CreatePlaylistYtDto);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YtSongsService } from './yt-songs.service';
import { CreateYtSongDto } from './dto/create-yt-song.dto';
import { UpdateYtSongDto } from './dto/update-yt-song.dto';

@Controller('yt-songs')
export class YtSongsController {
  constructor(private readonly ytSongsService: YtSongsService) {}

  @Post()
  getToInsertedSongs(@Body() YtSongDto: CreateYtSongDto) {
    return this.ytSongsService.getSongs(YtSongDto);
  }

}

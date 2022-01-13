import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YtSongsService } from './yt-songs.service';
import { CreateYtSongDto, SongsToInsertDTO } from './dto/create-yt-song.dto';

@Controller('yt-songs')
export class YtSongsController {
  constructor(private readonly ytSongsService: YtSongsService) { }

  @Post()
  getToInsertedSongs(@Body() ytSongDto: CreateYtSongDto) {
    console.log(ytSongDto)

    return this.ytSongsService.getSongs(ytSongDto);
  }

  @Post('/insert/:token/:playlistId')
  insertSongs(@Body() songsToInsert: string[],
    @Param('token') token,
    @Param('playlistId') playlistId,
  ) {

    console.log(token, playlistId)
    return this.ytSongsService.insertSongs(songsToInsert, token, playlistId);
  }
}

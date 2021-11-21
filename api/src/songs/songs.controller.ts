import { Controller, Get, Post, Body, Headers, Param, Delete, Query, VERSION_NEUTRAL, Version } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Version(VERSION_NEUTRAL)
  @Get(':id')
  findOne(@Param('id',) id: string, @Query('token') token: string) {
    return this.songsService.getSongsFromPlaylist(id, token);
  }

  @Version('1')
  @Get(':id')
  findOnenew(@Param('id',) id: string, @Headers() headers) {
    return this.songsService.getSongsFromPlaylist2(id, headers.authorization);
  }

}

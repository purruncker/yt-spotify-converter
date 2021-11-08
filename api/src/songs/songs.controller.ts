import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  @Get(':id')
  findOne(@Param('id',) id: string, @Query('token') token: string) {
    return this.songsService.getSongsFromPlaylist(id, token);
  }

}

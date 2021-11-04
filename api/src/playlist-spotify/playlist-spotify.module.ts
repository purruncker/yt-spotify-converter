import { Module } from '@nestjs/common';
import { PlaylistSpotifyService } from './playlist-spotify.service';
import { PlaylistSpotifyController } from './playlist-spotify.controller';

@Module({
  controllers: [PlaylistSpotifyController],
  providers: [PlaylistSpotifyService],
})
export class PlaylistSpotifyModule { }

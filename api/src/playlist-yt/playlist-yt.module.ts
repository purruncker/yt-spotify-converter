import { Module } from '@nestjs/common';
import { PlaylistYtService } from './playlist-yt.service';
import { PlaylistYtController } from './playlist-yt.controller';

@Module({
  controllers: [PlaylistYtController],
  providers: [PlaylistYtService]
})
export class PlaylistYtModule {}

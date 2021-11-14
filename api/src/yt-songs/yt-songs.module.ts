import { Module } from '@nestjs/common';
import { YtSongsService } from './yt-songs.service';
import { YtSongsController } from './yt-songs.controller';

@Module({
  controllers: [YtSongsController],
  providers: [YtSongsService]
})
export class YtSongsModule {}

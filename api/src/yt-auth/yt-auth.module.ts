import { Module } from '@nestjs/common';
import { YtAuthService } from './yt-auth.service';
import { YtAuthController } from './yt-auth.controller';

@Module({
  controllers: [YtAuthController],
  providers: [YtAuthService]
})
export class YtAuthModule {}

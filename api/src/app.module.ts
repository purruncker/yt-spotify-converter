import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistSpotifyModule } from './playlist-spotify/playlist-spotify.module';
import { SongsModule } from './songs/songs.module';
import { YtAuthModule } from './yt-auth/yt-auth.module';
import { PlaylistYtModule } from './playlist-yt/playlist-yt.module';

@Module({
  imports: [
    TestModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // Order is important, as it will take the first value that
        // appears if there is the same variable in multiple files.
        '.env.dev',
        '.env'
      ]
    }), PlaylistSpotifyModule, SongsModule, YtAuthModule, PlaylistYtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

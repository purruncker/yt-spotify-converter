import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { SongsService } from 'src/songs/songs.service';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService, SongsService]
})
export class RecommendationModule { }

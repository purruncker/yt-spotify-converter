import { Controller, Get, Post, Body, Patch, Param, Headers } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { ResponseSongsDto } from './dto/update-recommendation.dto';

@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) { }



  @Get('spotify')
  getSpotifyRecomendaition(@Headers() headers) {
    return this.recommendationService.getSpotifyRecomendaition(headers.authorization);
  }


}

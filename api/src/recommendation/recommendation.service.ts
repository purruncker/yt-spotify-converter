import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Url } from 'src/enums/url.model';
import { SongsService } from 'src/songs/songs.service';
import { ResponseSongsDto } from './dto/update-recommendation.dto';

@Injectable()
export class RecommendationService {
  constructor(private readonly songsService: SongsService) { }

  async getSpotifyRecomendaition(token: string) {

    let res: ResponseSongsDto[] = [];

    await this.songsService.getSongsFromPlaylist2("3tFkTwB1YPDYpAmQhMloIf", token)
      .then(data => res = data);

    await this.songsService.getSongsFromPlaylist2("44ECJdoVs1i8KaJiNHIDUq", token)
      .then(data => { res = res.concat(data) });

    const index = Math.floor(Math.random() * res.length)

    return res[index] as ResponseSongsDto
  }
}

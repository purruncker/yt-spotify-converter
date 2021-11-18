import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Url } from 'src/enums/url.model';
import { ResponseSongsDto } from './dto/update-recommendation.dto';

@Injectable()
export class RecommendationService {
  async getSpotifyRecomendaition(token: string) {
    let res: ResponseSongsDto[] = [];

    const config = {
      headers: {
        'Authorization': token
      }
    }
    await axios.get(`${Url.OWN}/songs/3tFkTwB1YPDYpAmQhMloIf/header`, config)
      .then(data =>
        res = data.data)

    await axios.get(`${Url.OWN}/songs/44ECJdoVs1i8KaJiNHIDUq/header`, config)
      .then(data =>
        res.concat(data.data))

    const index = Math.floor(Math.random() * res.length)

    return res[index] as ResponseSongsDto
  }
}

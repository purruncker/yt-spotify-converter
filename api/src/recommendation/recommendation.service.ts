import { Injectable } from '@nestjs/common';
import axios from 'axios';
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
    await axios.get(`http://localhost:3000/songs/3tFkTwB1YPDYpAmQhMloIf/header`, config)
      .then(data =>
        res = data.data)

    await axios.get(`http://localhost:3000/songs/44ECJdoVs1i8KaJiNHIDUq/header`, config)
      .then(data =>
        res.concat(data.data))

    const index = Math.floor(Math.random() * res.length)

    return res[index] as ResponseSongsDto
  }
}

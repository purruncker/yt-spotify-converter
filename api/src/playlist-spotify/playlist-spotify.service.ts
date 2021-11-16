import { HttpException, Injectable } from '@nestjs/common';
import { CurrentUseresSpotifyPlaylistsDTO, SpotifyPlaylistDTO } from './dto/playlist-spotify.dto';
import axios from 'axios';

@Injectable()
export class PlaylistSpotifyService {
  public async get(accessToken: string) {

    const header = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    return axios.get("https://api.spotify.com/v1/me/playlists", header).then(data => {

      if (!data['data'].hasOwnProperty('items')) {
        console.log('no  items');
        return [];
      }
      //console.log(data['data']['items']);

      let res: SpotifyPlaylistDTO[] = data['data']['items'].map(val => {

        return {
          id: val['id'],
          title: val['name'],
          songsCount: val['tracks']['total'],
          coverUrl: val.images[0].url,
          type: 'spotify'
        }
      })

      return res;
    }).catch((error) => {
      console.log(error.response)
      console.log(error.response.data.error.errors)
      throw new HttpException(error.response.data.error.message, error.response.data.error.code)
    })
  }
}

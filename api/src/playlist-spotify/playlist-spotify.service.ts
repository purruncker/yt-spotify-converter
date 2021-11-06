import { Injectable } from '@nestjs/common';
import { CreatePlaylistSpotifyDto } from './dto/create-playlist-spotify.dto';
import { CurrentUseresSpotifyPlaylistsDTO } from './dto/playlist-spotify.dto';
import axios from 'axios';
@Injectable()
export class PlaylistSpotifyService {
  public async get(createPlaylistSpotifyDto: CreatePlaylistSpotifyDto) {

    const header = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + createPlaylistSpotifyDto
      }
    }
    return axios.get("https://api.spotify.com/v1/me/playlists", header).then(data => {

      if (!data['data'].hasOwnProperty('items')) {
        console.log('no  items');
        return [];
      }
      //console.log(data['data']['items']);
      let res: CurrentUseresSpotifyPlaylistsDTO[] = data['data']['items'].map(val => {
        //console.log(val);
        return {
          id: val['id'],
          name: val['name'],
          count: val['tracks']['total']

        }
      })
      //console.log(res);
      return res;
    }).catch((error) => {
      console.log(error);
    })
  }
}

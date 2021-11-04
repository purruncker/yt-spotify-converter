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
      let res: CurrentUseresSpotifyPlaylistsDTO[] = data['data']['items'].map(val => {
        return {
          id: val['id'],
          name: val['name']
        }
      })
      return res;
    }).catch((error) => {
      console.log(error);
    })
  }
}

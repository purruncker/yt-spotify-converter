import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreatePlaylistYtDto } from './dto/create-playlist-yt.dto';
import { ResultPlaylistYtDto } from './dto/update-playlist-yt.dto';

@Injectable()
export class PlaylistYtService {
  createPlaylist(CreatePlaylistYtDto: CreatePlaylistYtDto) {
    //console.log(CreatePlaylistYtDto.acessToken, CreatePlaylistYtDto.playlistName)



    const params = {
      "snippet": {
        "title": CreatePlaylistYtDto.playlistName,
        "description": "Made by Robert"
      },
      "status": {
        "privacyStatus": CreatePlaylistYtDto.status
      }
    }


    const config = {
      headers: {
        'Authorization': `Bearer ${CreatePlaylistYtDto.acessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const url = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cstatus&key=${process.env.YT_API_KEY}`
    return axios.post(url, params, config).then(data => {
      console.log(data);
      //TODO:response for frontend
    }).catch((error) => {
      console.log(error.response)
      console.log(error.response.data.error.errors)
    })
    return
  }
}

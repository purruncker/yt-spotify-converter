import { HttpException, Injectable } from '@nestjs/common';
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
        "description": CreatePlaylistYtDto.description + "\n \nMade with Cockroach Converter by Robert and Cedric"
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
      //console.log(data);
      let res: ResultPlaylistYtDto = {
        id: data.data.id,
        title: data.data.snippet.title,
        channelTitle: data.data.snippet.channelTitle,
        status: data.data.status.privacyStatus
      }
      return res;
      //TODO:response for frontend
    }).catch((error) => {

      console.log(error.response)
      console.log(error.response.data.error.errors)
      throw new HttpException(error.response.data.error.message, error.response.data.error.code)
    })
    return
  }
}

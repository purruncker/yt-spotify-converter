import { HttpException, Injectable } from '@nestjs/common';
import { ResponseSongsDto } from './dto/update-song.dto';
import axios from 'axios';
@Injectable()
export class SongsService {

  async getSongsFromPlaylist(id: string, token: string) {
    //spotify endpoint: https://developer.spotify.com/console/get-playlist-tracks/
    //eg fot  field        : items(track.artists.name,track.name)
    //market :DE

    //console.log(id, token);

    const params = new URLSearchParams()
    params.append('fields', 'items(track.id,track.artists.name,track.name,track.album.images)')
    params.append('market', 'DE')

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, params
    }

    return axios.get("https://api.spotify.com/v1/playlists/" + id + "/tracks", config).then(data => {
      let modifieddata = data.data.items.filter(function (val) {
        return val.track != null;
      })
      //console.log(modifieddata)
      let res: ResponseSongsDto[] = modifieddata.map(val => {
        return {
          name: val['track'].name,
          artists: val['track'].artists,
          imageHref: val.track.album.images[0].url,
          id: val.track.id
        }
      })

      //console.log(res);

      return res;
    }
    ).catch((error) => {

      console.log(error.response)
      console.log(error.response.data.error.errors)
      throw new HttpException(error.response.data.error.message, error.response.data.error.code)
    })

  }

}

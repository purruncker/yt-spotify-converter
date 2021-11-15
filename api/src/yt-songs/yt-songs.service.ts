import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { title } from 'process';
import { CreateYtSongDto, SongsToInsertDTO } from './dto/create-yt-song.dto';
import { IdsToInsertDTO } from './dto/update-yt-song.dto';

@Injectable()
export class YtSongsService {

  public async getSongs(YtSongDto: CreateYtSongDto) {

    const config = {
      headers: {
        'Authorization': `Bearer ${YtSongDto.accesToken}`,
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
      }
    }
    const url = `https://youtube.googleapis.com/youtube/v3/search?`

    let result: IdsToInsertDTO[] = [];

    for (const x of YtSongDto.songs) {
      const artists = x.artists.map(y => y['name']).join(' ')

      await axios.get(url + `part=snippet&maxResults=1&order=relevance&q=${artists}${x.name}&key=${process.env.YT_API_KEY}`, config)
        .then(data => {
          const item: IdsToInsertDTO = {
            id: data['data']['items'][0].id.videoId,
            name: data['data']['items'][0].snippet.title,
            channelTitle: data['data']['items'][0].snippet.channelTitle
          }
          result.push(item);
          //console.log(result)
        }).catch(error => {
          console.log(error['response']['data'])
          throw new HttpException(error.response.data.error.message, error.response.data.error.code)

        })
    }
    return result;

  }

  public async insertSongs(songsToInsert: string[], token: string, playlistId: string) {

    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${process.env.YT_API_KEY}`
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }


    for (const song of songsToInsert) {
      const params = {

        "snippet": {
          "playlistId": playlistId,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": song
          }
        }
      }

      await axios.post(url, params, config).then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error['response']['data'])
        throw new HttpException(error.response.data.error.message, error.response.data.error.code)

      })
    }
  }
}

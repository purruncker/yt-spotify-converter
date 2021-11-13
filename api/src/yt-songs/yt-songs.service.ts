import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateYtSongDto } from './dto/create-yt-song.dto';
import { UpdateYtSongDto } from './dto/update-yt-song.dto';

@Injectable()
export class YtSongsService {

  getSongs(YtSongDto :CreateYtSongDto){
    
    const config = {
      headers: {
        'Authorization': `Bearer ${YtSongDto.accesToken}`,
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
      }
    }
    const url =`https://youtube.googleapis.com/youtube/v3/search?`
    let count = 0;
    YtSongDto.songs.forEach(x =>{
      let artists = ""
      x.artists.forEach(y =>{
        artists += y['name'] + " "
      })
      //console.log(artists)

      axios.get(url + `part=snippet&maxResults=1&order=relevance&q=${artists}${x.name}&key=${process.env.YT_API_KEY}`,config)
      .then(data =>{
        console.log(data['data']['items'])
        console.log(data['data']['items'].id.videoId)
        console.log(count++)

        return
      }).catch(error =>{
        console.log(error['response']['data'])
        console.log(count++)
      })
      
// GET &order=relevance&q=Travis%20scott%20sicko%20mode&key=[YOUR_API_KEY] HTTP/1.1
    })
  }
}

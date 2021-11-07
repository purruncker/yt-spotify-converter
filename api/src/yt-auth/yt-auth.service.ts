import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateYtAuthDto } from './dto/create-yt-auth.dto';
import { UpdateYtAuthDto } from './dto/update-yt-auth.dto';

@Injectable()
export class YtAuthService {
  public async create(createYtAuthDto: CreateYtAuthDto): Promise<UpdateYtAuthDto> {

    return new Promise((resolve, reject) => {
      const params = new URLSearchParams()
      params.append('client_id', process.env.YT_CLIENT_ID)
      params.append('client_secret', process.env.YT_CLIENT_SECRET)
      params.append('redirect_uri', 'http://localhost:4200/yt')
      params.append('grant_type', 'authorization_code')
      params.append('code', createYtAuthDto.grantCode)

      return axios.post("https://oauth2.googleapis.com/token", params).then((result) => {
        resolve(result.data as UpdateYtAuthDto)
        console.log(result);
      }).catch((error) => {
        if (error.isAxiosError) {
          reject(error.response.data)
        } else {
          reject(error)
        }
      })
    })

  }
}

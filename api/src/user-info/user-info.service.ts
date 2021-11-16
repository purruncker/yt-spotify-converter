import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { ResponseUserDTO } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  getUserInfo(createUserInfoDto: CreateUserInfoDto, accessToken: string) {
    const opts = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": accessToken
      }
    }
    return axios.get("https://api.spotify.com/v1/me", opts).then(data => {
      return {
        id: data.data.id,
        name: data.data.display_name,
        avatarUrl: data.data.images[0]?.url || null
      } as ResponseUserDTO
    }).catch(error => {
      console.log(error['response']['data'])
      throw new HttpException(error.response.data.error.message, error.response.data.error.code)

    })
  }


}

import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  getUserInfo(createUserInfoDto: CreateUserInfoDto) {
    //   const opts = {
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer " + this.accessToken
    //     }
    //   }
    //   axios.get("https://api.spotify.com/v1/me", opts).then(data => {
    //     this.name = data['display_name'];
    //     console.log(data)
    //     if (typeof data['images'] !== 'undefined' && data['images'].length > 0) {
    //       this.userImage = data['images'][0].url
    //     }
    //     else {
    //       this.userImage = "../../../assets/logo/cockroach.png";
    //     }
    //     //console.log(this.name);
    //   }
    //   ).catch(error => {
    //     console.log(error['response']['data'])
    //     throw new HttpException(error.response.data.error.message, error.response.data.error.code)

    //   })
  }


}

import { Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';

import axios from 'axios';

import { ISpotifyAuthenticationDTO } from './dto/spotify-authentication.dto';

@Injectable()
export class AuthenticationService {

  public async create(createAuthenticationDto: CreateAuthenticationDto): Promise<ISpotifyAuthenticationDTO> {
    return new Promise((resolve, reject) => {
      // Define required params
      // see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
      const params = new URLSearchParams()
      params.append('grant_type', 'authorization_code')
      params.append('code', createAuthenticationDto.grantCode)
      params.append('redirect_uri', 'http://localhost:4200')

      // Define headers
      // see: https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
      const config = {
        headers: {
          'Authorization': "Basic " + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET).toString("base64"),
          'Content-Type': "application/x-www-form-urlencoded"
        }
      }

      // Send request to spotify
      // and resolve promise with the DTO
      return axios.post("https://accounts.spotify.com/api/token", params, config).then((result) => {
        resolve(result.data as ISpotifyAuthenticationDTO)
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

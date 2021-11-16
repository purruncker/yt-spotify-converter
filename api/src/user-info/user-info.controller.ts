import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) { }

  @Get('spotify')
  getUserInfo(@Headers() headers, @Body() createUserInfoDto: CreateUserInfoDto,
  ) {
    console.log('test')
    return this.userInfoService.getUserInfo(createUserInfoDto, headers.authorization);
  }

}

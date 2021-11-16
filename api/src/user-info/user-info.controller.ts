import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) { }

  @Get()
  getUserInfo(@Headers() headers, @Body() createUserInfoDto: CreateUserInfoDto,
  ) {
    console.log(headers)
    return this.userInfoService.getUserInfo(createUserInfoDto);
  }

}

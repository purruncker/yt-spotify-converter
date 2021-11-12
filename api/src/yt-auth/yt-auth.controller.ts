import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YtAuthService } from './yt-auth.service';
import { CreateYtAuthDto } from './dto/create-yt-auth.dto';
import { UpdateYtAuthDto } from './dto/update-yt-auth.dto';

@Controller('yt-auth')
export class YtAuthController {
  constructor(private readonly ytAuthService: YtAuthService) { }

  @Post()
  create(@Body() createYtAuthDto: CreateYtAuthDto) {
    //console.log(createYtAuthDto)
    return this.ytAuthService.create(createYtAuthDto);
  }

}

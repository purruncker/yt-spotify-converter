import { PartialType } from '@nestjs/mapped-types';
import { CreateYtSongDto } from './create-yt-song.dto';

export class UpdateYtSongDto extends PartialType(CreateYtSongDto) {}

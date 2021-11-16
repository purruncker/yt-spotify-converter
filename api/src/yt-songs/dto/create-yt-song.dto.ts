import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateYtSongDto {

    @IsNotEmpty()
    @IsString()
    accesToken: string;
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsArray()
    songs: SongDTO[];
}

export class SongDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsArray()
    artists: string[];
}

export class SongsToInsertDTO {
    @IsNotEmpty()
    @IsString()
    id: string;
}

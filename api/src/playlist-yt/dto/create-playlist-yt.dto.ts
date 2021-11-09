import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistYtDto {
    @IsNotEmpty({ message: "playlistName not set" })
    @IsString()
    playlistName: string;
    @IsNotEmpty()
    @IsString()
    acessToken: string;
    @IsNotEmpty()
    @IsString()
    status: string;
    @IsNotEmpty()
    @IsString()
    description: string;
}

import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlaylistSpotifyDto {
    @IsNotEmpty()
    @IsString()
    public AcessToken: string;
}

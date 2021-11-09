import { IsNotEmpty, IsString } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    public acesstoken: string;
}

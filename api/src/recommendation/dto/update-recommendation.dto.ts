import { Artist } from "src/songs/dto/artist.dto";

export class ResponseSongsDto {
    public id: string;
    public artists: Artist[];
    public title: string;
    public coverUrl: string;
}
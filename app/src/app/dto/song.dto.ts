import { Artist } from "../model/artist.model";
import { Platform } from "../model/platform.model";

export class SongDTO {
    public id: string;
    public title: string;
    public artists: Artist[];
    public coverUrl: string;
    public type: Platform | string;
}
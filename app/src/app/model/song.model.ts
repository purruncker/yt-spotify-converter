import { Artist } from "./artist.model";
import { Platform } from "./platform.model";


export class Song {
    public id: string;
    public title: string;
    public artists: Artist[];
    public coverUrl: string;
    public type: Platform | string;
}
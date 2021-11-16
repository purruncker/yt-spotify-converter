import { Platform } from "./platform.model";

export class Playlist {
    public id: string;
    public type: Platform | string;
    public title: string;
    public songsCount: number;
    public coverUrl: string;
}
import { SongDTO } from "./song.dto";

export interface YtPlaylistDTO {
    id?: string;
    title?: string;
    channelTitle?: string;
    status?: string;
}

export interface FillYtPlaylist{
    id?:string;
    songs?:SongDTO[];
}
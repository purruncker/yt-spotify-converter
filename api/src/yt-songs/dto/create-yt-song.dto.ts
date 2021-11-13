export class CreateYtSongDto {
    accesToken: string;
    id: string;
    songs: SongDTO[];
}

export class SongDTO {
    id: string;
    name: string;
    artists: string[];
}

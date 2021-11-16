import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { config } from "../config";
import { SongDTO } from "../dto/song.dto";
import { PlaylistDTO } from "../dto/playlist.dto";
import { Artist } from "../model/artist.model";
import { Platform } from "../model/platform.model";
import { Playlist } from "../model/playlist.model";
import { Song } from "../model/song.model";
import { AuthenticationService } from "./authentication.service";
import { HttpErrorService } from "./http-error.service";

// TODO: Can be removed if backend sends proper ids for songs
import { v4 as uuidv4 } from "uuid";


@Injectable({
    providedIn: "root"
})
export class PlaylistService {

    private readonly _selectedPlaylistSubject: BehaviorSubject<Playlist> = new BehaviorSubject(null);
    private readonly _selectedSongsSubject: BehaviorSubject<Song[]> = new BehaviorSubject(null);

    public $selectedPlaylist: Observable<Playlist> = this._selectedPlaylistSubject.asObservable();
    public $selectedSongs: Observable<Song[]> = this._selectedSongsSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        public authService: AuthenticationService,
        private errorService: HttpErrorService
    ) { }

    public async findPlaylists(): Promise<Playlist[]> {
        // TODO: Change with Playlist as soon as it is changed in BE
        // TODO: Make access token a header and read it in nestjs
        return this.httpClient.get<PlaylistDTO[]>(config.apiBaseUrl + "/spotify-playlist/" + this.authService.getSessionSnap().accessToken).toPromise().catch((error) => {
            console.log(error);
            this.errorService.createError("Deine Playlisten konnten nicht abgerufen werden", "getPlaylists Spotify", error.status)
        }).then((playlists) => {
            if (!playlists) return [];
            return playlists as Playlist[]

        })
    }

    public async findSongsOfPlaylist(playlistId: string): Promise<Song[]> {
        // TODO: Make access token a header and read it in nestjs
        const params = new HttpParams().set('token', this.authService.getSessionSnap().accessToken);

        return this.httpClient.get<SongDTO[]>(`${config.apiBaseUrl}/songs/${playlistId}`, { params }).toPromise().catch((error) => {
            console.log(error);
            this.errorService.createError("Deine Songs konnten nicht abgerufen werden", "getSongs Spotify", error.status)
        }).then((songs) => {
            if (!songs) return [];

            const songsRemapped = songs as Song[];

            // TODO: Should implement subscriber for this, so that every time the selectedSongs change we save it in the current browsers session storage
            sessionStorage.setItem('songs', JSON.stringify(songsRemapped));
            return songsRemapped;
        })
    }

    public getSelectedPlaylistSnap(): Playlist {
        return this._selectedPlaylistSubject.getValue();
    }

    public setSelectedPlaylist(playlist: Playlist): void {
        this._selectedPlaylistSubject.next(playlist);
    }

    public getSelectedSongsSnap(): Song[] {
        return this._selectedSongsSubject.getValue();
    }

    public setSelectedSongs(songs: Song[]): void {
        this._selectedSongsSubject.next(songs);
    }

}
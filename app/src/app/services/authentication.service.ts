import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as querystring from "query-string";
import { BehaviorSubject, Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { SpotifyTokenDTO } from "../dto/spotifyToken.dto";
import { Session, SessionType } from "../model/session.model";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    // TODO: Implement refresh tokens
    // TODO: Refresh sessions if expired (track expiresAt of access token)

    private CLIENT_ID_SPOTIFY: string = "155c517b9e2548f0805bbc3b30896d63";
    private SPOTIFY_SCOPES: string = "playlist-read-private playlist-read-collaborative user-read-private user-read-email"

    private _sessionSubject: BehaviorSubject<Session> = new BehaviorSubject(null);
    public $session: Observable<Session> = this._sessionSubject.asObservable();

    constructor(private httpclient: HttpClient) { }

    public async requestSpotifyGrantCode(): Promise<void> {
        const data = {
          response_type: 'code',
          client_id: this.CLIENT_ID_SPOTIFY,
          scope: this.SPOTIFY_SCOPES,
          // TODO: Change to http://localhost:4200/authorize/spotify
          redirect_uri: "http://localhost:4200/spotify",
          state: "veryRandomString123"
        }
    
        window.location.href = "https://accounts.spotify.com/authorize?" + querystring.stringify(data);
    }

    public requestSpotifyAccessToken(grantCode: string): Promise<SpotifyTokenDTO> {
        return this.httpclient.post<SpotifyTokenDTO>("http://localhost:3000/authentication", { grantCode }).toPromise().then((response) => {
            const data: SpotifyTokenDTO = {
                accessToken: response["access_token"],
                expiresAt: new Date(Date.now() + 1000 * Number(response["expires_in"])),
                refreshToken: response["refresh_token"]
            }

            this.createSpotifyOrientedSession(data)
            return data;
        })
      }

    public async createSpotifyOrientedSession(data: SpotifyTokenDTO) {
        this._sessionSubject.next({
            type: SessionType.SESSION_SPOTIFY,
            accessToken: data.accessToken,
            expiresAt: data.expiresAt,
            refreshToken: data.refreshToken
        })
    }

    public getSessionSnap(): Session {
        return this._sessionSubject.getValue();
    }

    public hasValidSession(): boolean {
        const session = this._sessionSubject.getValue();
        if(!session) return false;
        return session.accessToken && (session.expiresAt?.getTime() || 0) > Date.now();
    }

}
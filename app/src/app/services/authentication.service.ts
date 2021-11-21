import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as querystring from "query-string";
import { BehaviorSubject, Observable } from "rxjs";
import { SpotifyTokenDTO } from "../dto/spotifyToken.dto";
import { Session, SessionType } from "../model/session.model";
import { User } from "../model/user.model";
import { HttpErrorService } from "./http-error.service";

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

    constructor(private httpclient: HttpClient, private errorService: HttpErrorService) { }

    public async requestSpotifyGrantCode(): Promise<void> {
        const data = {
            response_type: 'code',
            client_id: this.CLIENT_ID_SPOTIFY,
            scope: this.SPOTIFY_SCOPES,
            redirect_uri: "http://localhost:4200/authorize/spotify",
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

    public async createSpotifyOrientedSession(data: SpotifyTokenDTO): Promise<Session> {
        const session: Session = {
            type: SessionType.SESSION_SPOTIFY,
            accessToken: data.accessToken,
            expiresAt: data.expiresAt,
            refreshToken: data.refreshToken
        }

        // Push session, so we can request user info
        this._sessionSubject.next(session);

        // Request user info
        const user: User = await this.findUser("spotify");
        session.user = user;

        // Push new session, but with user's data
        this._sessionSubject.next(session);
        return session;
    }

    public async findUser(platform: "spotify" | "youtube"): Promise<User> {
        // TODO: return this.httpclient.get<User>(`http://localhost:3000/users/${platform}`).toPromise();

        const opts = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.getSessionSnap().accessToken
            })
        }

        return this.httpclient.get<User>("https://api.spotify.com/v1/me", opts).toPromise().catch((reason) => {
            console.log(reason);
            this.errorService.createError("Dein Name konnten nicht abgerufen werden", "getUserInfo Spotify", reason.status)
        }).then(data => {
            return {
                name: data['display_name'],
                avatarUrl: data['images'][0]?.url || 'app/src/assets/logo/cockroach.svg'
            }
        })
    }

    public getSessionSnap(): Session {
        return this._sessionSubject.getValue();
    }

    public hasValidSession(): boolean {
        const session = this._sessionSubject.getValue();
        if (!session) return false;
        return session.accessToken && (session.expiresAt?.getTime() || 0) > Date.now();
    }

}
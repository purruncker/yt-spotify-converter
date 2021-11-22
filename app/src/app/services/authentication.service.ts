import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { SpotifyTokenDTO } from "../dto/spotifyToken.dto";
import { Platform } from "../model/platform.model";
import { Session, SessionType } from "../model/session.model";
import { User } from "../model/user.model";
import { HttpErrorService } from "./http-error.service";

export const USER_LOCALSTORAGE_ITEM = "cc-user";
export const ACCESSTOKEN_COOKIE_NAME = "cc-access-token";
export const REFRESHTOKEN_COOKIE_NAME = "cc-refresh-token";
export const SESSIONTYPE_COOKIE_NAME = "cc-sess-type";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    // TODO: Implement refresh tokens
    // TODO: Refresh sessions if expired (track expiresAt of access token)

    private CLIENT_ID_SPOTIFY: string = "155c517b9e2548f0805bbc3b30896d63";
    private SPOTIFY_SCOPES: string = "playlist-read-private playlist-read-collaborative user-read-private user-read-email"

    private readonly _sessionSubject: BehaviorSubject<Session> = new BehaviorSubject(null);
    private readonly _userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
    private readonly _readySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public readonly $session: Observable<Session> = this._sessionSubject.asObservable().pipe(filter((session) => !!session));
    public readonly $user: Observable<User> = this._userSubject.asObservable();
    public readonly $ready: Observable<boolean> = this._readySubject.asObservable();

    constructor(
        private httpclient: HttpClient, 
        private errorService: HttpErrorService,
        private cookieService: CookieService,
    ) { 
        // Notify application that session 
        // and user data is being fetched and initialized
        this._readySubject.next(false)

        // Restore user session and data asynchronously 
        // and subscribe after that
        this.restoreSession()
        .then(() => this.restoreUser())
        .then((user: User) => {
            console.log("[SERVICE] [AUTH] Subscribing to session and user.")

            // Subscribe to session changes to instantly 
            // persist them in cookie etc.
            this.$session.subscribe(() => this.persistSession());
            this.$user.subscribe(() => this.persistUser());

            // Notify application that session and user initialization is done
            this._readySubject.next(true);
        })
    }
    public async requestSpotifyGrantCode(): Promise<void> {
        const params = new URLSearchParams();
        params.append("response_type", "code");
        params.append("client_id", this.CLIENT_ID_SPOTIFY);
        params.append("redirect_uri", (environment.production) ? `${window.location.origin}/authorize/spotify` : "http://localhost:4200/authorize/spotify")
        params.append("scope", this.SPOTIFY_SCOPES);
        params.append("state", "veryRandomString123")
    
        window.location.href = "https://accounts.spotify.com/authorize?" + params;
    }

    public requestSpotifyAccessToken(grantCode: string, grantType: "authorization_code" | "refresh_token" = "authorization_code"): Promise<SpotifyTokenDTO> {
        return this.httpclient.post<SpotifyTokenDTO>("http://localhost:3000/authentication", { grantCode, grantType }).toPromise().then((response) => {
            console.log("got token: ", response)
            const data: SpotifyTokenDTO = {
                accessToken: response["access_token"],
                expiresAt: new Date(Date.now() + 1000 * Number(response["expires_in"])),
                refreshToken: response["refresh_token"]
            }
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
        const user: User = await this.findUser(Platform.SPOTIFY);
        this._userSubject.next(user)
        return session;
    }

    /**
     * Fetch user information based on platform used for first login.
     * @param platform Platform the user used on first login
     * @returns User data
     */
    public async findUser(platform: Platform): Promise<User> {
        // TODO: return this.httpclient.get<User>(`http://localhost:3000/users/${platform}`).toPromise();
        
        const opts = {
            headers: new HttpHeaders({
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this.getSessionSnap().accessToken
            })
        }

        return this.httpclient.get<User>("https://api.spotify.com/v1/me", opts).toPromise().catch((reason) => {
            // Reasons: Access token expired
            this.logout()
            console.log(reason);
            this.errorService.createError("Dein Name konnten nicht abgerufen werden", "getUserInfo Spotify", reason.status)
        }).then(data => {
            return {
                name: data['display_name'],
                avatarUrl: data['images'][0]?.url || "app/src/assets/logo/cockroach.svg"
            }
        })
    }

    public getSessionSnap(): Session {
        return this._sessionSubject.getValue();
    }

    public hasValidSession(): boolean {
        const session = this._sessionSubject.getValue();
        return session && session.accessToken && session.type != SessionType.SESSION_ANONYMOUS;
    }

    public async persistSession(): Promise<void> {
        const session: Session = this._sessionSubject.getValue()

        console.log(`[SERVICE] [AUTH] Persisting session of type '${session.type.toUpperCase()}'`)
        if(session.refreshToken) this.cookieService.put(REFRESHTOKEN_COOKIE_NAME, session.refreshToken, { expires: new Date(Date.now() + 1000 * 60 * 60 * 7) })
        if(session.type) this.cookieService.put(SESSIONTYPE_COOKIE_NAME, session.type, { expires: new Date(Date.now() + 1000 * 60 * 60 * 7) })

        // TODO: Check why expiresAt does not exists sometime?
        if(session.accessToken) this.cookieService.put(ACCESSTOKEN_COOKIE_NAME, session.accessToken, { expires: session.expiresAt?.toUTCString() })
    }

    public async persistUser(): Promise<void> {
        const user: User = this._userSubject.getValue()
        if(!!localStorage && !!user) {
            console.log("persisting user...", user)
            localStorage.setItem(USER_LOCALSTORAGE_ITEM, JSON.stringify(user));
        }
    }

    private async restoreSession(): Promise<Session> {
        const sessionType = this.cookieService.hasKey(ACCESSTOKEN_COOKIE_NAME) ? this.cookieService.get(SESSIONTYPE_COOKIE_NAME) as Platform : SessionType.SESSION_ANONYMOUS
        const session: Session = {
            type: sessionType,
            accessToken: undefined,
            refreshToken: undefined
        }
        
        if(!this.cookieService.hasKey(ACCESSTOKEN_COOKIE_NAME)) {
            console.warn("[SERVICE] [SESSION] No session cookie found: Session expired")

            // Access token expired
            if(!this.cookieService.hasKey(REFRESHTOKEN_COOKIE_NAME)) {
                console.warn("[SERVICE] [SESSION] No refresh token cookie found: Session is dead, can't be refreshed")

                // Refresh token is also expired
                this.logout();
                this._sessionSubject?.next(session)
                return session;
            } else {
                // TODO: Make platform independant
                // Refresh token is valid --> request new access token
                const tokenResponse: SpotifyTokenDTO = await this.requestSpotifyAccessToken(this.cookieService.get(REFRESHTOKEN_COOKIE_NAME), "refresh_token")

                // Invalidate user data and old refresh token --> logout()
                this.logout();

                // Create session with it
                session.accessToken = tokenResponse.accessToken;
                session.refreshToken = tokenResponse.refreshToken;
                session.type = Platform.SPOTIFY;
                session.expiresAt = tokenResponse.expiresAt;

                // Persist session and push
                this._sessionSubject?.next(session);
                this.persistSession();
                return session;
            }
        } else {
            // Access token still valid
            // Create session
            session.accessToken = this.cookieService.get(ACCESSTOKEN_COOKIE_NAME),
            session.refreshToken = this.cookieService.get(REFRESHTOKEN_COOKIE_NAME),
            session.type = sessionType
            
            this._sessionSubject?.next(session);
            return session;
        }
    }

    private async restoreUser(): Promise<User> {
        return new Promise((resolve) => {
            setTimeout(() => {
                if(!localStorage) {
                    console.error("[SERVICE] [USER] LocalStorage is not supported by Browser")
                    resolve(null);
                    this._userSubject.next(null);
                    return;
                }

                if(!this.hasValidSession()) {
                    console.warn("[SERVICE] [USER] Cannot request user data: Session invalid.")

                    if(this._sessionSubject.getValue().type != SessionType.SESSION_ANONYMOUS) {
                        console.warn("[SERVICE] [USER] Logging out user: No user data could be requested.")                      
                        this.logout();
                    }

                    this._userSubject.next(null);
                    resolve(null);
                    return;
                }

                const user: User = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_ITEM)) as User;
                this._userSubject.next(user);
                
                this.findUser(Platform.SPOTIFY).then((user) => {
                    console.log("[SERVICE] [USER] Reloaded user data in background.")
                    // if(!user) this.logout();
                    // else this._userSubject.next(user)
                    // TODO: Maybe check status code to check if the service is currently unavailable, or user account does not exist
                    // After checking this and the result is user account does not exists --> logout, otherwise continue as session is still working
                    this._userSubject.next(user)
                })

                console.log("[SERVICE] [USER] Restored user data from localStorage: ", user)
                resolve(user);
            }, 1000)
        })
    }

    public async logout() {
        console.log("logging out...")

        this.cookieService.removeAll();
        if(!!localStorage) localStorage.removeItem(USER_LOCALSTORAGE_ITEM);
        
        this.setAnonymous();
    }

    public setTentative() {
        console.log(`[SERVICE] [SESSION] Setting session to type '${SessionType.SESSION_TENTATIVE.toUpperCase()}'.`)

        this._sessionSubject.next({
            accessToken: undefined,
            refreshToken: undefined,
            type: SessionType.SESSION_TENTATIVE
        })
    }

    public setAnonymous() {
        console.log(`[SERVICE] [SESSION] Setting session to type '${SessionType.SESSION_ANONYMOUS.toUpperCase()}'.`)

        this._sessionSubject.next({
            accessToken: undefined,
            refreshToken: undefined,
            type: SessionType.SESSION_ANONYMOUS
        })
    }

}
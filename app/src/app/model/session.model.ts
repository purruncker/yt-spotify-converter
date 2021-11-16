import { Platform } from "./platform.model";

export class Session {

    public type: SessionType | Platform = SessionType.SESSION_ANONYMOUS;
    public accessToken: string = "";
    public expiresAt?: Date = null;
    public refreshToken: string = "";

}

export const enum SessionType {
    SESSION_SPOTIFY = "spotify",
    SESSION_YOUTUBE = "youtube",
    SESSION_ANONYMOUS = "anonymous"
}
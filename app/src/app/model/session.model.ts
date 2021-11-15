import { User } from "./user.model";

export class Session {

    public type: SessionType = SessionType.SESSION_ANONYMOUS;
    public accessToken?: string = null;
    public expiresAt?: Date = null;
    public refreshToken?: string = null;
    public user?: User = null;

}

export const enum SessionType {
    SESSION_SPOTIFY = 1,
    SESSION_YOUTUBE = 2,
    SESSION_ANONYMOUS = 3
}
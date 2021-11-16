import { Artist } from "./artist.model";
import { Platform } from "./platform.model";

import { v4 as uuidv4 } from "uuid";

export class Song {
    // TODO: BE needs to return ids
    public id: string = uuidv4();
    public title: string;
    public artists: Artist[];
    public coverUrl: string;
    public type: Platform | string;
}
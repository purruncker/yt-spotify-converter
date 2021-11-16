import { Pipe, PipeTransform } from "@angular/core";
import { Artist } from "../model/artist.model";

@Pipe({ name: 'artists' })
export class ArtistsToStringPipe implements PipeTransform {
    
    public transform(value: Artist[]): string {
        return value.map((artist) => artist.name).join(", ");
    }

}
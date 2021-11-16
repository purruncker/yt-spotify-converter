import { Router } from "@angular/router";
import { SpotifyToYoutubeFlow } from "../flows/spotifyToYoutube.flow";
import { Flow } from "../model/flow.model";

export class FlowBuilder {

    public static buildSpotifyFirstFlow(router: Router): Flow {
        return new Flow(SpotifyToYoutubeFlow, router)
    }

}
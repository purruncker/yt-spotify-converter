import { FlowButtonOptions, FlowStep } from "../model/flow-step.model";

const startFlowButton: FlowButtonOptions = {
    text: "Start with connecting to Spotify",
    class: "btn-spotify",
    icon: "fab fa-spotify"
}

export const SpotifyToYoutubeFlow: FlowStep[] = [
    { 
        id: "index", 
        title: "Overview", 
        displayId: 1,
        isListed: false, 
        route: {
            path: "/"
        },
        navigation: {
            nextId: "connect-spotify"
        },
        buttons: {
            start: startFlowButton
        }
    },
    { 
        id: "connect-spotify", 
        title: "Connect with Spotify", 
        displayId: 1,
        isListed: true,
        route: {
            path: "/authorize/spotify"
        },
        navigation: {
            nextId: "choose-playlist"
        }
    },
    { 
        id: "choose-playlist", 
        title: "Choose your playlist", 
        displayId: 2,
        isListed: true,
        flowLabel: "Please select one of the playlists below:",
        route: {
            path: "/choose-playlist"
        },
        navigation: {
            nextId: "choose-songs"
        }
    },
    { 
        id: "choose-songs", 
        title: "Choose songs", 
        displayId: 2,
        isListed: false, 
        flowLabel: "Please select which songs you want to include:",
        route: {
            path: "/choose-songs"
        },
        navigation: {
            nextId: "yt"
        }
    },
    { 
        id: "yt", 
        title: "Connect to YouTube", 
        displayId: 3,
        isListed: true,
        route: {
            path: "/yt"
        },
        navigation: {
            // TODO
        }
    },
    { 
        id: "create-playlist", 
        title: "Create playlist", 
        displayId: 3,
        isListed: false, 
        flowLabel: "You can now setup the playlist:",
        route: {
            path: null
        },
        navigation: {
            // TODO
        }
    },
    { 
        id: "convert-playlist", 
        title: "Move playlist to YouTube", 
        displayId: 3,
        isListed: false,
        route: {
            path: null
        },
        navigation: {
            // TODO
        }
    }
]
import { FlowButtonOptions, FlowButtonType, FlowStep } from "../model/flow-step.model";

const startFlowButton: FlowButtonOptions = {
    text: "Start with connecting to Spotify",
    class: "btn-spotify",
    icon: "fab fa-spotify",
    type: FlowButtonType.START
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
            nextId: "choose-playlist",
            preserveQuery: true
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
            nextId: "connect-youtube"
        }
    },
    { 
        id: "connect-youtube", 
        title: "Connect to YouTube", 
        displayId: 3,
        isListed: true,
        route: {
            path: "/authorize/youtube"
        },
        navigation: {
            nextId: "create-playlist",
            preserveQuery: true
        }
    },
    { 
        id: "create-playlist", 
        title: "Create new playlist", 
        displayId: 3,
        isListed: false, 
        flowLabel: "You can now setup the playlist:",
        route: {
            path: "/create-playlist"
        },
        navigation: {
            nextId: "done"
        }
    },
    { 
        id: "done", 
        title: "Done", 
        displayId: 3,
        isListed: false,
        route: {
            path: "/done"
        }
    }
]
import { FlowButtonOptions, FlowStep } from "../model/flow-step.model";
import { FlowService } from "../services/flow.service";

const startFlowButton: FlowButtonOptions = {
    text: "Start with connecting to Spotify",
    class: "btn-spotify",
    icon: "fab fa-spotify",
    onClick: (flowService: FlowService) => {
        console.log("start button clicked")
        flowService.startFlow();
    }
}

export const SpotifyToYoutubeFlow: FlowStep[] = [
    { 
        id: 1, 
        title: "Overview", 
        allowBack: false, 
        allowNext: false, 
        isListed: false, 
        nextRoute: { 
            path: "/authorize/spotify" 
        }, 
        customNextButton: startFlowButton
    },
    { 
        id: 2, 
        title: "Connect with Spotify", 
        allowBack: false, 
        allowNext: true, 
        isListed: true, 
        nextRoute: { 
            path: "/choose-songs" 
        } 
    },
    { 
        id: 3, 
        title: "Choose your playlist", 
        allowBack: false, 
        allowNext: true, 
        isListed: true, 
        nextRoute: { 
            path: "/choose-songs" 
        }, 
        flowLabel: "Please select one of the playlists below:" 
    },
    { 
        id: 4, 
        title: "Choose songs", 
        allowBack: false, 
        allowNext: true, 
        isListed: false, 
        nextRoute: { 
            path: "/yt" 
        }, 
        flowLabel: "Please select which songs you want to include:" 
    },
    { 
        id: 5, 
        title: "Connect to YouTube", 
        allowBack: false, 
        allowNext: false, 
        isListed: true
    },
    { 
        id: 6, 
        title: "Create playlist", 
        allowBack: false, 
        allowNext: true, 
        isListed: false, 
        flowLabel: "You can now setup the playlist:" 
    },
    { 
        id: 7, 
        title: "Move playlist to YouTube", 
        allowBack: true, 
        allowNext: true, 
        isListed: false
    }
]
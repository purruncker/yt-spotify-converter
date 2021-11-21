import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, skip } from "rxjs/operators";
import { SpotifyToYoutubeFlow } from "../flows/spotifyToYoutube.flow";
import { FlowStep } from "../model/flow-step.model";
import { Flow, FLOW_SESSIONSTORAGE_KEY, PersistableFlow } from "../model/flow.model";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class FlowService {

    private _currentStepSubject: BehaviorSubject<FlowStep> = new BehaviorSubject(null);
    private _selectedFlowSubject: BehaviorSubject<Flow> = new BehaviorSubject(null);

    public $currentStep: Observable<FlowStep> = this._currentStepSubject.asObservable();
    public $currentFlow: Observable<Flow> = this._selectedFlowSubject.asObservable().pipe(filter((flow) => !!flow));

    constructor(private router: Router, private authService: AuthenticationService) {
        this.restoreFlow().then((flow) => {
            console.log("setting flow after init: ", flow)
            this._selectedFlowSubject.next(flow);

            // Save flow to localStorage, if it updates
            this.$currentFlow.subscribe(async(flow) => {
                this._currentStepSubject.next(flow.currentStep)
                this.persistFlow()
            })
        });

        this.authService.$session.pipe(filter((session) => !!session)).subscribe(() => {
            if(this.hasActiveFlow()) {
                console.warn("[FLOW-SERVICE] Aborting current flow: Invalid session found.")
                this.abort();
            }
        })
    }

    public async startFlow() {
        // Set session to tentative. This is for the router to know that the
        // session is not to be treated like ANONYMOUS after being redirected back
        // from platform login.
        this.authService.setTentative();

        console.log("[FLOW-SERVICE] Starting flow...")
        const flow = this._selectedFlowSubject.getValue();
        flow.start();

        this._selectedFlowSubject.next(flow);
    }

    public async nextStep() {
        console.log("[FLOW-SERVICE] Triggering next step in flow...")
        const flow = this._selectedFlowSubject.getValue();
        flow.next();

        this._selectedFlowSubject.next(flow);
    }

    public async backStep() {
        const flow = this._selectedFlowSubject.getValue();
        flow.back();

        this._selectedFlowSubject.next(flow);
    }

    public async abort(routeToHome: boolean = true) {
        this.getFlow().abort()
        if(routeToHome) this.router.navigate(["/"])
    }

    public async selectDefaultFlow() {
        const flow = this.createDefaultFlow();
        this._selectedFlowSubject.next(flow);
        return flow;
    }

    public hasActiveFlow(): boolean {
        return this._selectedFlowSubject.getValue()?.isActive
    }

    public async persistFlow() {
        if(this._selectedFlowSubject?.getValue()) {
            this._selectedFlowSubject.getValue().persist();
        }
    }

    public createDefaultFlow(): Flow {
        return new Flow(SpotifyToYoutubeFlow, this.router)
    }

    public async restoreFlow(): Promise<Flow> {
        if(!!localStorage) {
            console.log("restoring flow")
            const persistedFlow: PersistableFlow = JSON.parse(localStorage.getItem(FLOW_SESSIONSTORAGE_KEY)) as PersistableFlow;

            if(persistedFlow) {
                const restoredFlow = new Flow(SpotifyToYoutubeFlow, this.router);
                restoredFlow.srcPlatform = persistedFlow.srcPlatform;
                restoredFlow.destPlatform = persistedFlow.destPlatform;
                restoredFlow.setStepById(persistedFlow.currentStepId);

                console.log("found persisted flow: ", restoredFlow)
                this._selectedFlowSubject.next(restoredFlow);
    
                return restoredFlow;
            }
        }

        console.log("no flow to restore, selecting default...")
        return this.createDefaultFlow();
    }

    public getFlow(): Flow {
        return this._selectedFlowSubject.getValue();
    }

}
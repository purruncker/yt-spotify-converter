import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { SpotifyToYoutubeFlow } from "../flows/spotifyToYoutube.flow";
import { FlowStep } from "../model/flow-step.model";
import { Flow, FLOW_SESSIONSTORAGE_KEY, PersistableFlow } from "../model/flow.model";

@Injectable({
    providedIn: 'root'
})
export class FlowService {

    private _currentStepSubject: BehaviorSubject<FlowStep> = new BehaviorSubject(null);
    private _selectedFlowSubject: BehaviorSubject<Flow> = new BehaviorSubject(null);

    public $currentStep: Observable<FlowStep> = this._currentStepSubject.asObservable();
    public $selectedFlow: Observable<Flow> = this._selectedFlowSubject.asObservable().pipe(filter((flow) => !!flow));

    constructor(private router: Router) {
        this.restoreFlow().then((flow) => {
            console.log("setting flow after init: ", flow)
            this._selectedFlowSubject.next(flow);

            // Save flow to sessionStorage, if it updates
            this.$selectedFlow.subscribe(async() => this.persistFlow())
        });
    }

    public async startFlow() {
        console.log("starting flow...")
        const flow = this._selectedFlowSubject.getValue();
        flow.start();

        this._selectedFlowSubject.next(flow);
    }

    public async nextStep() {
        console.log("triggering next step...")
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
        console.log("aborting flow..")
        sessionStorage.clear();
        // this.selectDefaultFlow();
        if(routeToHome) this.router.navigate(["/"])
    }

    public async selectDefaultFlow() {
        const flow = this.createDefaultFlow();
        this._selectedFlowSubject.next(flow);
        return flow;
    }

    public hasActiveFlow(): boolean {
        return this._selectedFlowSubject.getValue()?.hasStarted
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
        if(!!sessionStorage) {
            console.log("restoring flow")
            const persistedFlow: PersistableFlow = JSON.parse(sessionStorage.getItem(FLOW_SESSIONSTORAGE_KEY)) as PersistableFlow;

            if(persistedFlow) {
                const restoredFlow = new Flow(SpotifyToYoutubeFlow, this.router);
                restoredFlow.srcPlatform = persistedFlow.srcPlatform;
                restoredFlow.destPlatform = persistedFlow.destPlatform;
                restoredFlow.hasStarted = persistedFlow.hasStarted;
                restoredFlow.setStepById(persistedFlow.currentStepId);
    
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
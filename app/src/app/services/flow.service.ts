import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { FlowStep } from "../model/flow-step.model";
import { Flow } from "../model/flow.model";

export const FLOW_SESSIONSTORAGE_KEY = "currentFlow";

@Injectable({
    providedIn: 'root'
})
export class FlowService implements OnInit {

    private readonly _currentStepSubject: BehaviorSubject<FlowStep> = new BehaviorSubject(null);
    private readonly _selectedFlowSubject: BehaviorSubject<Flow> = new BehaviorSubject(null);

    public $currentStep: Observable<FlowStep> = this._currentStepSubject.asObservable();
    public $selectedFlow: Observable<Flow> = this._selectedFlowSubject.asObservable();

    constructor(private router: Router) {}

    public ngOnInit(): void {
        this.restoreFlow();
        // Save flow to sessionStorage, if it updates
        this.$selectedFlow.subscribe(async() => this.persistFlow())
    }

    public async startFlow() {
        const flow = this._selectedFlowSubject.getValue();
        flow.start();

        this._selectedFlowSubject.next(flow);
    }

    public async nextStep() {
        const flow = this._selectedFlowSubject.getValue();
        flow.next();

        this._selectedFlowSubject.next(flow);
    }

    public async backStep() {
        const flow = this._selectedFlowSubject.getValue();
        flow.back();

        this._selectedFlowSubject.next(flow);
    }

    public async abort() {
        const flow = this._selectedFlowSubject.getValue();
        flow.next();

        this._selectedFlowSubject.next(flow);
        sessionStorage.clear();
        this.selectDefaultFlow();
    }

    public async selectDefaultFlow() {
        this._selectedFlowSubject.next(new Flow([
            { id: 1, title: "Overview", allowBack: false, allowNext: false, isListed: false, nextRoute: { path: "/authorize/spotify" }, customNextButton: { text: "Start with connecting to Spotify", class: "btn-spotify", icon: "fab fa-spotify" }},
            { id: 2, title: "Connect with Spotify", allowBack: false, allowNext: true, isListed: true, nextRoute: { path: "/choose-songs" } },
            { id: 3, title: "Choose your playlist", allowBack: false, allowNext: true, isListed: true, nextRoute: { path: "/choose-songs" } },
            { id: 4, title: "Choose songs", allowBack: false, allowNext: true, isListed: false, nextRoute: { path: "/yt" } },
            { id: 5, title: "Connect to YouTube", allowBack: false, allowNext: false, isListed: true },
            { id: 6, title: "Create playlist", allowBack: false, allowNext: true, isListed: false },
            { id: 7, title: "Move playlist to YouTube", allowBack: true, allowNext: true, isListed: false }
        ], this.router));
    }

    public hasActiveFlow(): boolean {
        return this._selectedFlowSubject.getValue().hasStarted
    }

    public async persistFlow() {
        // TODO: Save to sessionStorage
        if(!!sessionStorage) {
            sessionStorage.setItem(FLOW_SESSIONSTORAGE_KEY, JSON.stringify(this._selectedFlowSubject.getValue()))
        }
    }

    public async restoreFlow() {
        // TODO: Restore from sessionStorage
        if(!!sessionStorage) {
            this._selectedFlowSubject.next(JSON.parse(sessionStorage.getItem(FLOW_SESSIONSTORAGE_KEY)));
        }
    }

}
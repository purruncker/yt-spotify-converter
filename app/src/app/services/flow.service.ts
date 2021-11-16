import { Injectable, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { FlowStep } from "../model/flow-step.model";
import { Flow, FLOW_SESSIONSTORAGE_KEY } from "../model/flow.model";
import { FlowBuilder } from "../utils/flow.builder";

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
        console.log("starting flow...")
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
        this._selectedFlowSubject.next(FlowBuilder.buildSpotifyFirstFlow(this.router));
    }

    public hasActiveFlow(): boolean {
        return this._selectedFlowSubject.getValue().hasStarted
    }

    public async persistFlow() {
        this._selectedFlowSubject.getValue().persist();
    }

    public async restoreFlow() {
        if(!!sessionStorage) {
            this._selectedFlowSubject.next(JSON.parse(sessionStorage.getItem(FLOW_SESSIONSTORAGE_KEY)));
        }
    }

}